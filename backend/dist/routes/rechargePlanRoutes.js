"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const rechargePlanController_1 = require("../controllers/rechargePlanController");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const router = express_1.default.Router();
const planValidation = [
    (0, express_validator_1.body)('network', 'Valid network is required (Jio, Airtel, Vi, BSNL)')
        .isIn(['Jio', 'Airtel', 'Vi', 'BSNL']),
    (0, express_validator_1.body)('price', 'Price must be a number').isNumeric(),
    (0, express_validator_1.body)('validity', 'Validity in days must be a number').isNumeric(),
    (0, express_validator_1.body)('category', 'Category is required').not().isEmpty(),
    (0, express_validator_1.body)('description', 'Description is required').not().isEmpty(),
];
// Public routes for getting plans
router.get('/', rechargePlanController_1.getPlans);
router.get('/:id', rechargePlanController_1.getPlanById);
// Admin only routes for managing plans
router.post('/', auth_1.protect, (0, auth_1.authorize)('admin'), (0, validate_1.validate)(planValidation), rechargePlanController_1.createPlan);
router.put('/:id', auth_1.protect, (0, auth_1.authorize)('admin'), rechargePlanController_1.updatePlan);
router.delete('/:id', auth_1.protect, (0, auth_1.authorize)('admin'), rechargePlanController_1.deletePlan);
exports.default = router;
