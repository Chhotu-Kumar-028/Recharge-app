"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHelpRequestStatus = exports.getHelpRequests = exports.createHelpRequest = void 0;
const HelpRequest_1 = __importDefault(require("../models/HelpRequest"));
// @desc    Create a new help request
// @route   POST /api/help-request
// @access  Private
const createHelpRequest = async (req, res) => {
    try {
        const { amountNeeded, reason, occupation, city } = req.body;
        const request = await HelpRequest_1.default.create({
            userId: req.user?.id,
            amountNeeded,
            reason,
            occupation,
            city,
        });
        res.status(201).json({
            success: true,
            message: 'Help request submitted successfully',
            data: request,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createHelpRequest = createHelpRequest;
// @desc    Get all help requests (with optional status filter)
// @route   GET /api/help-request
// @access  Public (or Private depending on requirements, let's say Public to see campaigns)
const getHelpRequests = async (req, res) => {
    try {
        const { status } = req.query;
        let query = {};
        if (status)
            query.status = status;
        const requests = await HelpRequest_1.default.find(query)
            .populate('userId', 'name city') // populate user details
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getHelpRequests = getHelpRequests;
// @desc    Update help request status
// @route   PUT /api/help-request/:id/status
// @access  Private/Admin
const updateHelpRequestStatus = async (req, res) => {
    try {
        const { status } = req.body; // status should be 'approved' or 'rejected'
        let request = await HelpRequest_1.default.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ success: false, message: 'Help request not found' });
        }
        request.status = status;
        await request.save();
        res.status(200).json({
            success: true,
            message: `Help request ${status}`,
            data: request,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateHelpRequestStatus = updateHelpRequestStatus;
