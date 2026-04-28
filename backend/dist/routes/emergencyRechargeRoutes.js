"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const emergencyRechargeController_1 = require("../controllers/emergencyRechargeController");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const router = express_1.default.Router();
const rechargeValidation = [
    (0, express_validator_1.body)('network', 'Valid network is required').isIn(['Jio', 'Airtel', 'Vi', 'BSNL']),
    (0, express_validator_1.body)('amount', 'Amount is required and must be a number').isNumeric(),
    (0, express_validator_1.body)('reason', 'Reason is required').not().isEmpty(),
];
const statusValidation = [
    (0, express_validator_1.body)('status', 'Valid status is required').isIn(['pending', 'approved', 'rejected', 'repaid']),
];
// All routes require authentication
router.use(auth_1.protect);
router.get('/:userId', emergencyRechargeController_1.getUserEmergencyRecharges);
router.post('/', (0, validate_1.validate)(rechargeValidation), emergencyRechargeController_1.createEmergencyRecharge);
// Admin only route
router.put('/:id/status', (0, auth_1.authorize)('admin'), (0, validate_1.validate)(statusValidation), emergencyRechargeController_1.updateEmergencyRechargeStatus);
exports.default = router;
