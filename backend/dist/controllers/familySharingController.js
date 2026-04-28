"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFamilyShares = exports.shareData = void 0;
const FamilySharing_1 = __importDefault(require("../models/FamilySharing"));
const DataWallet_1 = __importDefault(require("../models/DataWallet"));
const User_1 = __importDefault(require("../models/User"));
// @desc    Transfer unused data to a family member
// @route   POST /api/family-sharing
// @access  Private
const shareData = async (req, res) => {
    try {
        const { receiverMobile, relation, dataAmount } = req.body;
        const senderId = req.user?.id;
        // Get Sender's Data Wallet for today
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const senderWallet = await DataWallet_1.default.findOne({
            userId: senderId,
            date: { $gte: startOfDay },
        });
        if (!senderWallet) {
            return res.status(404).json({ success: false, message: 'Sender data wallet not found for today. Please initialize usage first.' });
        }
        if (senderWallet.remainingData < dataAmount) {
            return res.status(400).json({ success: false, message: 'Insufficient data to share' });
        }
        // Deduct data from sender
        senderWallet.remainingData -= dataAmount;
        await senderWallet.save();
        // Find receiver user by mobile
        const receiver = await User_1.default.findOne({ mobile: receiverMobile });
        let status = 'success'; // default to success
        if (receiver) {
            // Add data to receiver if they exist on the platform
            let receiverWallet = await DataWallet_1.default.findOne({
                userId: receiver.id,
                date: { $gte: startOfDay },
            });
            if (receiverWallet) {
                receiverWallet.remainingData += dataAmount;
            }
            else {
                // Initialize an ad-hoc wallet with the shared amount
                receiverWallet = new DataWallet_1.default({
                    userId: receiver.id,
                    dailyData: 0,
                    usedData: 0,
                    remainingData: dataAmount,
                    carryForwardData: dataAmount, // marking received as carry forward optionally
                    date: new Date(),
                });
            }
            await receiverWallet.save();
        }
        else {
            // Receiver not on the platform, maybe they will receive an SMS via our mock service
            console.log(`[Mock Info] Target mobile ${receiverMobile} not registered. Proceeding loosely as 'success' for demo.`);
        }
        // Record the sharing transaction
        const familyShare = await FamilySharing_1.default.create({
            senderId,
            receiverMobile,
            relation,
            dataAmount,
            status,
        });
        res.status(201).json({
            success: true,
            message: 'Data shared successfully',
            data: familyShare,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.shareData = shareData;
// @desc    Get data shares initiated by the user
// @route   GET /api/family-sharing/:userId
// @access  Private
const getFamilyShares = async (req, res) => {
    try {
        if (req.user?.id !== req.params.userId && req.user?.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        const shares = await FamilySharing_1.default.find({ senderId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: shares.length,
            data: shares,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getFamilyShares = getFamilyShares;
