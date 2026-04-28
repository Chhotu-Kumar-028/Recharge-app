import express from 'express';
import { body } from 'express-validator';
import {
  createHelpRequest,
  getHelpRequests,
  updateHelpRequestStatus,
} from '../controllers/helpRequestController';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = express.Router();

const helpRequestValidation = [
  body('amountNeeded', 'Valid amount is required').isNumeric(),
  body('reason', 'Reason is required').not().isEmpty(),
  body('occupation', 'Occupation is required').not().isEmpty(),
  body('city', 'City is required').not().isEmpty(),
];

const statusValidation = [
  body('status', 'Status must be either approved or rejected').isIn(['approved', 'rejected']),
];

// Public/Open route (anyone can view requests)
router.get('/', getHelpRequests);

// Protected routes (User must be logged in to request help)
router.post('/', protect, validate(helpRequestValidation), createHelpRequest);

// Admin-only route (Only admin can approve/reject)
router.put('/:id/status', protect, authorize('admin'), validate(statusValidation), updateHelpRequestStatus);

export default router;
