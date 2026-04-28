import { Request, Response } from 'express';
import User from '../models/User';
import Donation from '../models/Donation';
import HelpRequest from '../models/HelpRequest';
import FundingCampaign from '../models/FundingCampaign';

// @desc    Get aggregate data for admin dashboard
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardMetrics = async (req: Request, res: Response) => {
  try {
    // Run all count queries in parallel for efficiency
    const [
      totalUsers,
      totalDonations,
      totalHelpRequests,
      totalCampaigns,
      totalRechargeRequestsApproved
    ] = await Promise.all([
      User.countDocuments(),
      Donation.countDocuments(),
      HelpRequest.countDocuments(),
      FundingCampaign.countDocuments(),
      HelpRequest.countDocuments({ status: 'approved' })
    ]);

    // Calculate total monetary value of donations safely
    const donationTotalAggr = await Donation.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, totalSales: { $sum: '$amount' } } }
    ]);
    const totalDonationValue = donationTotalAggr[0]?.totalSales || 0;

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalDonations,
        totalDonationValue,
        totalHelpRequests,
        totalCampaigns,
        totalRechargeRequestsApproved
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
