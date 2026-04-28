"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const monthlyBillController_1 = require("../controllers/monthlyBillController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// All billing routes require authentication
router.use(auth_1.protect);
router.get('/:userId', monthlyBillController_1.getUserBills);
// Generating a bill is restricted to Admin normally, or specific systemic triggers
router.post('/generate/:userId', (0, auth_1.authorize)('admin'), monthlyBillController_1.generateMonthlyBill);
router.put('/pay/:billId', monthlyBillController_1.payBill);
exports.default = router;
