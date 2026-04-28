import express from 'express';
import { body } from 'express-validator';
import {
  getDataWallet,
  updateDataUsage,
  getMonthlySummary,
} from '../controllers/dataWalletController';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = express.Router();

const updateValidation = [
  body('userId', 'userId is required').not().isEmpty(),
  body('dataConsumed', 'dataConsumed must be a valid number').isNumeric(),
];

// All Data Wallet routes must be protected
router.use(protect);

router.get('/:userId', getDataWallet);
router.post('/update', validate(updateValidation), updateDataUsage);
router.get('/monthly-summary/:userId', getMonthlySummary);

export default router;
