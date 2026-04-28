import express from 'express';
import { body } from 'express-validator';
import {
  createEmergencyRecharge,
  getUserEmergencyRecharges,
  updateEmergencyRechargeStatus,
} from '../controllers/emergencyRechargeController';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = express.Router();

const rechargeValidation = [
  body('network', 'Valid network is required').isIn(['Jio', 'Airtel', 'Vi', 'BSNL']),
  body('amount', 'Amount is required and must be a number').isNumeric(),
  body('reason', 'Reason is required').not().isEmpty(),
];

const statusValidation = [
  body('status', 'Valid status is required').isIn(['pending', 'approved', 'rejected', 'repaid']),
];

// All routes require authentication
router.use(protect);

router.get('/:userId', getUserEmergencyRecharges);
router.post('/', validate(rechargeValidation), createEmergencyRecharge);

// Admin only route
router.put('/:id/status', authorize('admin'), validate(statusValidation), updateEmergencyRechargeStatus);

export default router;
