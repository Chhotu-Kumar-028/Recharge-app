import { Request, Response } from 'express';
import FundingCampaign from '../models/FundingCampaign';
import { AuthRequest } from '../middleware/auth';

// @desc    Get all funding campaigns
// @route   GET /api/funding
// @access  Public
export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await FundingCampaign.find({ isActive: true }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: campaigns.length,
      data: campaigns,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new funding campaign
// @route   POST /api/funding
// @access  Private/Admin
export const createCampaign = async (req: Request, res: Response) => {
  try {
    const campaign = await FundingCampaign.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      data: campaign,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Contribute to a campaign
// @route   PUT /api/funding/:id/contribute
// @access  Private
export const contributeToCampaign = async (req: AuthRequest, res: Response) => {
  try {
    const { amount } = req.body;
    let campaign = await FundingCampaign.findById(req.params.id);

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
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
