import express from 'express';
import { body } from 'express-validator';
import { register, login, getMe } from '../controllers/authController';
import { validate } from '../middleware/validate';
import { protect } from '../middleware/auth';

const router = express.Router();

// Validation Rules
const registerValidation = [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('mobile', 'Please include a valid mobile number').not().isEmpty(),
  body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  body('city', 'City is required').not().isEmpty(),
];

const loginValidation = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists(),
];

// Routes
router.post('/register', validate(registerValidation), register);
router.post('/login', validate(loginValidation), login);
router.get('/me', protect, getMe);

export default router;
