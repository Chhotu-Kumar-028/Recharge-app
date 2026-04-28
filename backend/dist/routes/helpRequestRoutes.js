"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const helpRequestController_1 = require("../controllers/helpRequestController");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const router = express_1.default.Router();
const helpRequestValidation = [
    (0, express_validator_1.body)('amountNeeded', 'Valid amount is required').isNumeric(),
    (0, express_validator_1.body)('reason', 'Reason is required').not().isEmpty(),
    (0, express_validator_1.body)('occupation', 'Occupation is required').not().isEmpty(),
    (0, express_validator_1.body)('city', 'City is required').not().isEmpty(),
];
const statusValidation = [
    (0, express_validator_1.body)('status', 'Status must be either approved or rejected').isIn(['approved', 'rejected']),
];
// Public/Open route (anyone can view requests)
router.get('/', helpRequestController_1.getHelpRequests);
// Protected routes (User must be logged in to request help)
router.post('/', auth_1.protect, (0, validate_1.validate)(helpRequestValidation), helpRequestController_1.createHelpRequest);
// Admin-only route (Only admin can approve/reject)
router.put('/:id/status', auth_1.protect, (0, auth_1.authorize)('admin'), (0, validate_1.validate)(statusValidation), helpRequestController_1.updateHelpRequestStatus);
exports.default = router;
