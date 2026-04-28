"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlan = exports.updatePlan = exports.createPlan = exports.getPlanById = exports.getPlans = void 0;
const RechargePlan_1 = __importDefault(require("../models/RechargePlan"));
// @desc    Get all recharge plans with optional filtering
// @route   GET /api/plans
// @access  Public
const getPlans = async (req, res) => {
    try {
        const { network, price, validity, category } = req.query;
        // Build filter object based on queries
        let query = {};
        if (network)
            query.network = network;
        if (category)
            query.category = category;
        if (price)
            query.price = { $lte: Number(price) };
        if (validity)
            query.validity = { $gte: Number(validity) };
        const plans = await RechargePlan_1.default.find(query).sort({ price: 1 });
        res.status(200).json({
            success: true,
            count: plans.length,
            data: plans,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getPlans = getPlans;
// @desc    Get single recharge plan by ID
// @route   GET /api/plans/:id
// @access  Public
const getPlanById = async (req, res) => {
    try {
        const plan = await RechargePlan_1.default.findById(req.params.id);
        if (!plan) {
            return res.status(404).json({ success: false, message: 'Plan not found' });
        }
        res.status(200).json({ success: true, data: plan });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getPlanById = getPlanById;
// @desc    Create new recharge plan
// @route   POST /api/plans
// @access  Private/Admin
const createPlan = async (req, res) => {
    try {
        const plan = await RechargePlan_1.default.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Plan created successfully',
            data: plan,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createPlan = createPlan;
// @desc    Update a recharge plan
// @route   PUT /api/plans/:id
// @access  Private/Admin
const updatePlan = async (req, res) => {
    try {
        let plan = await RechargePlan_1.default.findById(req.params.id);
        if (!plan) {
            return res.status(404).json({ success: false, message: 'Plan not found' });
        }
        plan = await RechargePlan_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            message: 'Plan updated successfully',
            data: plan,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.updatePlan = updatePlan;
// @desc    Delete a recharge plan
// @route   DELETE /api/plans/:id
// @access  Private/Admin
const deletePlan = async (req, res) => {
    try {
        const plan = await RechargePlan_1.default.findById(req.params.id);
        if (!plan) {
            return res.status(404).json({ success: false, message: 'Plan not found' });
        }
        await plan.deleteOne();
        res.status(200).json({ success: true, message: 'Plan removed' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deletePlan = deletePlan;
