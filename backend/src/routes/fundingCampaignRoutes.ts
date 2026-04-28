import express from 'express';
import { body } from 'express-validator';
import { getCampaigns, createCampaign, contributeToCampaign } from '../controllers/fundingCampaignController';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = express.Router();

const campaignValidation = [
  body('title', 'Campaign title is required').not().isEmpty(),
  body('description', 'Campaign description is required').not().isEmpty(),
  body('goalAmount', 'Goal amount must be a numeric value').isNumeric(),
];

const contributeValidation = [
  body('amount', 'Contribution amount is required and must be a number').isNumeric(),
];

// Public route to view active campaigns
router.get('/', getCampaigns);

// Protected routes
// Users can contribute to a campaign
router.put('/:id/contribute', protect, validate(contributeValidation), contributeToCampaign);

// Admins only can create campaigns
router.post('/', protect, authorize('admin'), validate(campaignValidation), createCampaign);

export default router;
