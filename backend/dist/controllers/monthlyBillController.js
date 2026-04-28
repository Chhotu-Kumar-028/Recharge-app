"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payBill = exports.generateMonthlyBill = exports.getUserBills = void 0;
const MonthlyBill_1 = __importDefault(require("../models/MonthlyBill"));
const DataWallet_1 = __importDefault(require("../models/DataWallet"));
// @desc    Get all bills for a user
// @route   GET /api/bills/:userId
// @access  Private
const getUserBills = async (req, res) => {
    try {
        if (req.user?.id !== req.params.userId && req.user?.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        const bills = await MonthlyBill_1.default.find({ userId: req.params.userId }).sort({ dueDate: -1 });
        res.status(200).json({ success: true, count: bills.length, data: bills });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getUserBills = getUserBills;
// @desc    Generate a monthly bill manually (Usually triggered by Cron)
// @route   POST /api/bills/generate/:userId
// @access  Private/Admin
const generateMonthlyBill = async (req, res) => {
    try {
        const { userId } = req.params;
        // In a real scenario, this gets the previous month logic
        // For demo purposes, we're calculating current month's extra data
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const wallets = await DataWallet_1.default.find({
            userId,
            date: { $gte: startOfMonth },
        });
        const totalExtraData = wallets.reduce((acc, curr) => acc + curr.extraDataUsed, 0);
        if (totalExtraData === 0) {
            return res.status(400).json({ success: false, message: 'No extra data used. Bill not required.' });
        }
        const costPerGB = parseFloat(process.env.COST_PER_GB || '15'); // default ₹15 per GB
        const totalAmount = totalExtraData * costPerGB;
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 15); // Due in 15 days
        const bill = await MonthlyBill_1.default.create({
            userId,
            totalExtraData,
            costPerGB,
            totalAmount,
            dueDate,
            status: 'unpaid',
        });
        res.status(201).json({
            success: true,
            message: 'Monthly bill generated successfully',
            data: bill,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.generateMonthlyBill = generateMonthlyBill;
// @desc    Pay a bill
// @route   PUT /api/bills/pay/:billId
// @access  Private
const payBill = async (req, res) => {
    try {
        const bill = await MonthlyBill_1.default.findById(req.params.billId);
        if (!bill) {
            return res.status(404).json({ success: false, message: 'Bill not found' });
        }
        if (req.user?.id !== bill.userId.toString() && req.user?.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to pay this bill' });
        }
        if (bill.status === 'paid') {
            return res.status(400).json({ success: false, message: 'Bill is already paid' });
        }
        bill.status = 'paid';
        await bill.save();
        res.status(200).json({
            success: true,
            message: 'Bill paid successfully',
            data: bill,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.payBill = payBill;
