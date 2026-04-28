import express from 'express';
import { getDashboardMetrics } from '../controllers/adminController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Apply protection and strictly admin authorization to all routes in this file
router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', getDashboardMetrics);

export default router;
