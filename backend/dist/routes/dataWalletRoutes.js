"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const dataWalletController_1 = require("../controllers/dataWalletController");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const router = express_1.default.Router();
const updateValidation = [
    (0, express_validator_1.body)('userId', 'userId is required').not().isEmpty(),
    (0, express_validator_1.body)('dataConsumed', 'dataConsumed must be a valid number').isNumeric(),
];
// All Data Wallet routes must be protected
router.use(auth_1.protect);
router.get('/:userId', dataWalletController_1.getDataWallet);
router.post('/update', (0, validate_1.validate)(updateValidation), dataWalletController_1.updateDataUsage);
router.get('/monthly-summary/:userId', dataWalletController_1.getMonthlySummary);
exports.default = router;
