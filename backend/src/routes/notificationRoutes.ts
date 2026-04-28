import express from 'express';
import { body } from 'express-validator';
import {
  getUserNotifications,
  createNotification,
  markAsRead,
} from '../controllers/notificationController';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = express.Router();

const notificationValidation = [
  body('userId', 'Target User ID is required').not().isEmpty(),
  body('type', 'Notification type is required').isIn(['low_data', 'plan_expiry', 'bill_due', 'emergency_recharge']),
  body('message', 'Message is required').not().isEmpty(),
];

// Ensure user is authenticated for all routes
router.use(protect);

router.get('/:userId', getUserNotifications);
router.put('/:id/read', markAsRead);

// Creating notifications is usually an admin task or triggered by systemic cron jobs
router.post('/', authorize('admin'), validate(notificationValidation), createNotification);

export default router;
