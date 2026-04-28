import express from 'express';
import { body } from 'express-validator';
import {
  getPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
} from '../controllers/rechargePlanController';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = express.Router();

const planValidation = [
  body('network', 'Valid network is required (Jio, Airtel, Vi, BSNL)')
    .isIn(['Jio', 'Airtel', 'Vi', 'BSNL']),
  body('price', 'Price must be a number').isNumeric(),
  body('validity', 'Validity in days must be a number').isNumeric(),
  body('category', 'Category is required').not().isEmpty(),
  body('description', 'Description is required').not().isEmpty(),
];

// Public routes for getting plans
router.get('/', getPlans);
router.get('/:id', getPlanById);

// Admin only routes for managing plans
router.post(
  '/',
  protect,
  authorize('admin'),
  validate(planValidation),
  createPlan
);
router.put('/:id', protect, authorize('admin'), updatePlan);
router.delete('/:id', protect, authorize('admin'), deletePlan);

export default router;
