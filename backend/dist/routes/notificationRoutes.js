"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const notificationController_1 = require("../controllers/notificationController");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const router = express_1.default.Router();
const notificationValidation = [
    (0, express_validator_1.body)('userId', 'Target User ID is required').not().isEmpty(),
    (0, express_validator_1.body)('type', 'Notification type is required').isIn(['low_data', 'plan_expiry', 'bill_due', 'emergency_recharge']),
    (0, express_validator_1.body)('message', 'Message is required').not().isEmpty(),
];
// Ensure user is authenticated for all routes
router.use(auth_1.protect);
router.get('/:userId', notificationController_1.getUserNotifications);
router.put('/:id/read', notificationController_1.markAsRead);
// Creating notifications is usually an admin task or triggered by systemic cron jobs
router.post('/', (0, auth_1.authorize)('admin'), (0, validate_1.validate)(notificationValidation), notificationController_1.createNotification);
exports.default = router;
