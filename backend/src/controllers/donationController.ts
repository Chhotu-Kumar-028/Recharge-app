import { Response } from 'express';
import Donation from '../models/Donation';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

// @desc    Create a new donation
// @route   POST /api/donations
// @access  Private
export const createDonation = async (req: AuthRequest, res: Response) => {
  try {
    const { campaignName, amount, paymentStatus } = req.body;

    const donation = await Donation.create({
      donorId: req.user?.id,
      campaignName,
      amount,
      paymentStatus: paymentStatus || 'completed', // Defaults to completed for mock purposes
    });

    // Optionally update user's role to 'donor' if they were just a 'user'
    if (req.user && req.user.role === 'user') {
        await User.findByIdAndUpdate(req.user.id, { role: 'donor' });
    }

    res.status(201).json({
      success: true,
      message: 'Donation recorded successfully',
      data: donation,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all donations
// @route   GET /api/donations
// @access  Private/Admin
export const getDonations = async (req: AuthRequest, res: Response) => {
  try {
    // Admins can see all, standard users/donors can only see their own
    let query = {};
    if (req.user?.role !== 'admin') {
        query = { donorId: req.user?.id };
    }

    const donations = await Donation.find(query)
      .populate('donorId', 'name email')
      .sort({ donatedAt: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
