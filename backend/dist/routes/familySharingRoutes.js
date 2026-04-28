"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const familySharingController_1 = require("../controllers/familySharingController");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const router = express_1.default.Router();
const shareValidation = [
    (0, express_validator_1.body)('receiverMobile', 'Receiver mobile number is required').not().isEmpty(),
    (0, express_validator_1.body)('relation', 'Relation (e.g., Wife, Brother) is required').not().isEmpty(),
    (0, express_validator_1.body)('dataAmount', 'Data amount must be a number').isNumeric(),
];
// All Family Sharing routes must be protected
router.use(auth_1.protect);
router.post('/', (0, validate_1.validate)(shareValidation), familySharingController_1.shareData);
router.get('/:userId', familySharingController_1.getFamilyShares);
exports.default = router;
