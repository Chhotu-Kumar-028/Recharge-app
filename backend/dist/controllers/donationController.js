"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDonations = exports.createDonation = void 0;
const Donation_1 = __importDefault(require("../models/Donation"));
const User_1 = __importDefault(require("../models/User"));
// @desc    Create a new donation
// @route   POST /api/donations
// @access  Private
const createDonation = async (req, res) => {
    try {
        const { campaignName, amount, paymentStatus } = req.body;
        const donation = await Donation_1.default.create({
            donorId: req.user?.id,
            campaignName,
            amount,
            paymentStatus: paymentStatus || 'completed', // Defaults to completed for mock purposes
        });
        // Optionally update user's role to 'donor' if they were just a 'user'
        if (req.user && req.user.role === 'user') {
            await User_1.default.findByIdAndUpdate(req.user.id, { role: 'donor' });
        }
        res.status(201).json({
            success: true,
            message: 'Donation recorded successfully',
            data: donation,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createDonation = createDonation;
// @desc    Get all donations
// @route   GET /api/donations
// @access  Private/Admin
const getDonations = async (req, res) => {
    try {
        // Admins can see all, standard users/donors can only see their own
        let query = {};
        if (req.user?.role !== 'admin') {
            query = { donorId: req.user?.id };
        }
        const donations = await Donation_1.default.find(query)
            .populate('donorId', 'name email')
            .sort({ donatedAt: -1 });
        res.status(200).json({
            success: true,
            count: donations.length,
            data: donations,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getDonations = getDonations;
