import express from 'express';
import {
  getUserBills,
  generateMonthlyBill,
  payBill,
} from '../controllers/monthlyBillController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// All billing routes require authentication
router.use(protect);

router.get('/:userId', getUserBills);

// Generating a bill is restricted to Admin normally, or specific systemic triggers
router.post('/generate/:userId', authorize('admin'), generateMonthlyBill);

router.put('/pay/:billId', payBill);

export default router;
