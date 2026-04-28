import express from 'express';
import { body } from 'express-validator';
import { getFreeWifiLocations, addFreeWifiLocation } from '../controllers/freeWifiController';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = express.Router();

const wifiValidation = [
  body('placeName', 'Place name is required').not().isEmpty(),
  body('address', 'Address is required').not().isEmpty(),
  body('city', 'City is required').not().isEmpty(),
  body('type', 'Type of location is required').not().isEmpty(),
  body('timing', 'Timing is required').not().isEmpty(),
  body('latitude', 'Latitude is required and must be a number').isNumeric(),
  body('longitude', 'Longitude is required and must be a number').isNumeric(),
];

// Public route to view Wi-Fi locations
router.get('/', getFreeWifiLocations);

// Admin route to add new Wi-Fi locations
router.post(
  '/',
  protect,
  authorize('admin'),
  validate(wifiValidation),
  addFreeWifiLocation
);

export default router;
