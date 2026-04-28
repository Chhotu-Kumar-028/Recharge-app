"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardMetrics = void 0;
const User_1 = __importDefault(require("../models/User"));
const Donation_1 = __importDefault(require("../models/Donation"));
const HelpRequest_1 = __importDefault(require("../models/HelpRequest"));
const FundingCampaign_1 = __importDefault(require("../models/FundingCampaign"));
// @desc    Get aggregate data for admin dashboard
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardMetrics = async (req, res) => {
    try {
        // Run all count queries in parallel for efficiency
        const [totalUsers, totalDonations, totalHelpRequests, totalCampaigns, totalRechargeRequestsApproved] = await Promise.all([
            User_1.default.countDocuments(),
            Donation_1.default.countDocuments(),
            HelpRequest_1.default.countDocuments(),
            FundingCampaign_1.default.countDocuments(),
            HelpRequest_1.default.countDocuments({ status: 'approved' })
        ]);
        // Calculate total monetary value of donations safely
        const donationTotalAggr = await Donation_1.default.aggregate([
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getDashboardMetrics = getDashboardMetrics;
