"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmergencyRechargeStatus = exports.getUserEmergencyRecharges = exports.createEmergencyRecharge = void 0;
const EmergencyRecharge_1 = __importDefault(require("../models/EmergencyRecharge"));
// @desc    Create a new emergency recharge request
// @route   POST /api/emergency-recharge
// @access  Private
const createEmergencyRecharge = async (req, res) => {
    try {
        const { network, amount, reason } = req.body;
        const recharge = await EmergencyRecharge_1.default.create({
            userId: req.user?.id,
            network,
            amount,
            reason,
        });
        res.status(201).json({
            success: true,
            message: 'Emergency recharge requested successfully',
            data: recharge,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createEmergencyRecharge = createEmergencyRecharge;
// @desc    Get all emergency recharges for a user
// @route   GET /api/emergency-recharge/:userId
// @access  Private
const getUserEmergencyRecharges = async (req, res) => {
    try {
        if (req.user?.id !== req.params.userId && req.user?.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        const recharges = await EmergencyRecharge_1.default.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: recharges.length,
            data: recharges,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getUserEmergencyRecharges = getUserEmergencyRecharges;
// @desc    Update emergency recharge status
// @route   PUT /api/emergency-recharge/:id/status
// @access  Private/Admin
const updateEmergencyRechargeStatus = async (req, res) => {
    try {
        const { status } = req.body; // status: pending, approved, rejected, repaid
        let recharge = await EmergencyRecharge_1.default.findById(req.params.id);
        if (!recharge) {
            return res.status(404).json({ success: false, message: 'Recharge request not found' });
        }
        recharge.status = status;
        await recharge.save();
        res.status(200).json({
            success: true,
            message: `Emergency recharge status updated to ${status}`,
            data: recharge,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateEmergencyRechargeStatus = updateEmergencyRechargeStatus;
