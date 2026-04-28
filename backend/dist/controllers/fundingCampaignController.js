"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contributeToCampaign = exports.createCampaign = exports.getCampaigns = void 0;
const FundingCampaign_1 = __importDefault(require("../models/FundingCampaign"));
// @desc    Get all funding campaigns
// @route   GET /api/funding
// @access  Public
const getCampaigns = async (req, res) => {
    try {
        const campaigns = await FundingCampaign_1.default.find({ isActive: true }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: campaigns.length,
            data: campaigns,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getCampaigns = getCampaigns;
// @desc    Create a new funding campaign
// @route   POST /api/funding
// @access  Private/Admin
const createCampaign = async (req, res) => {
    try {
        const campaign = await FundingCampaign_1.default.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Campaign created successfully',
            data: campaign,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createCampaign = createCampaign;
// @desc    Contribute to a campaign
// @route   PUT /api/funding/:id/contribute
// @access  Private
const contributeToCampaign = async (req, res) => {
    try {
        const { amount } = req.body;
        let campaign = await FundingCampaign_1.default.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ success: false, message: 'Campaign not found' });
        }
        if (!campaign.isActive) {
            return res.status(400).json({ success: false, message: 'This campaign is no longer active' });
        }
        campaign.collectedAmount += amount;
        // We roughly estimate 'peopleHelped' based on standard plan cost e.g., ₹200 per person
        // OR we could just increase peopleHelped mathematically
        campaign.peopleHelped += Math.floor(amount / 200);
        if (campaign.collectedAmount >= campaign.goalAmount) {
            campaign.isActive = false; // Goal reached, mark inactive
        }
        await campaign.save();
        res.status(200).json({
            success: true,
            message: `Successfully contributed ${amount} to the campaign`,
            data: campaign,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.contributeToCampaign = contributeToCampaign;
