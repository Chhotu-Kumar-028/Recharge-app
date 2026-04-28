"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authController_1 = require("../controllers/authController");
const validate_1 = require("../middleware/validate");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Validation Rules
const registerValidation = [
    (0, express_validator_1.body)('name', 'Name is required').not().isEmpty(),
    (0, express_validator_1.body)('email', 'Please include a valid email').isEmail(),
    (0, express_validator_1.body)('mobile', 'Please include a valid mobile number').not().isEmpty(),
    (0, express_validator_1.body)('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    (0, express_validator_1.body)('city', 'City is required').not().isEmpty(),
];
const loginValidation = [
    (0, express_validator_1.body)('email', 'Please include a valid email').isEmail(),
    (0, express_validator_1.body)('password', 'Password is required').exists(),
];
// Routes
router.post('/register', (0, validate_1.validate)(registerValidation), authController_1.register);
router.post('/login', (0, validate_1.validate)(loginValidation), authController_1.login);
router.get('/me', auth_1.protect, authController_1.getMe);
exports.default = router;
