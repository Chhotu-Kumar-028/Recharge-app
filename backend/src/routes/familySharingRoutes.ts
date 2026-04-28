import express from 'express';
import { body } from 'express-validator';
import {
  shareData,
  getFamilyShares,
} from '../controllers/familySharingController';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = express.Router();

const shareValidation = [
  body('receiverMobile', 'Receiver mobile number is required').not().isEmpty(),
  body('relation', 'Relation (e.g., Wife, Brother) is required').not().isEmpty(),
  body('dataAmount', 'Data amount must be a number').isNumeric(),
];

// All Family Sharing routes must be protected
router.use(protect);

router.post('/', validate(shareValidation), shareData);
router.get('/:userId', getFamilyShares);

export default router;
