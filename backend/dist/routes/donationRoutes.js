"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const donationController_1 = require("../controllers/donationController");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const router = express_1.default.Router();
const donationValidation = [
    (0, express_validator_1.body)('campaignName', 'Campaign name is required').not().isEmpty(),
    (0, express_validator_1.body)('amount', 'Donation amount must be a number').isNumeric(),
];
// Protected routes (User must be logged in to donate or view their donations)
// Note: Logic in the controller restricts standard users to see only their own donations
router.get('/', auth_1.protect, donationController_1.getDonations);
router.post('/', auth_1.protect, (0, validate_1.validate)(donationValidation), donationController_1.createDonation);
exports.default = router;
