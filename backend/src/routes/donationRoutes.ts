import express from 'express';
import { body } from 'express-validator';
import { createDonation, getDonations } from '../controllers/donationController';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = express.Router();

const donationValidation = [
  body('campaignName', 'Campaign name is required').not().isEmpty(),
  body('amount', 'Donation amount must be a number').isNumeric(),
];

// Protected routes (User must be logged in to donate or view their donations)
// Note: Logic in the controller restricts standard users to see only their own donations
router.get('/', protect, getDonations);
router.post('/', protect, validate(donationValidation), createDonation);

export default router;
