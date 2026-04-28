"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const fundingCampaignController_1 = require("../controllers/fundingCampaignController");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const router = express_1.default.Router();
const campaignValidation = [
    (0, express_validator_1.body)('title', 'Campaign title is required').not().isEmpty(),
    (0, express_validator_1.body)('description', 'Campaign description is required').not().isEmpty(),
    (0, express_validator_1.body)('goalAmount', 'Goal amount must be a numeric value').isNumeric(),
];
const contributeValidation = [
    (0, express_validator_1.body)('amount', 'Contribution amount is required and must be a number').isNumeric(),
];
// Public route to view active campaigns
router.get('/', fundingCampaignController_1.getCampaigns);
// Protected routes
// Users can contribute to a campaign
router.put('/:id/contribute', auth_1.protect, (0, validate_1.validate)(contributeValidation), fundingCampaignController_1.contributeToCampaign);
// Admins only can create campaigns
router.post('/', auth_1.protect, (0, auth_1.authorize)('admin'), (0, validate_1.validate)(campaignValidation), fundingCampaignController_1.createCampaign);
exports.default = router;
