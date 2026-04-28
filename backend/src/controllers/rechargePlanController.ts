import { Request, Response } from 'express';
import RechargePlan from '../models/RechargePlan';

// @desc    Get all recharge plans with optional filtering
// @route   GET /api/plans
// @access  Public
export const getPlans = async (req: Request, res: Response) => {
  try {
    const { network, price, validity, category } = req.query;
    
    // Build filter object based on queries
    let query: any = {};
    if (network) query.network = network;
    if (category) query.category = category;
    if (price) query.price = { $lte: Number(price) };
    if (validity) query.validity = { $gte: Number(validity) };

    const plans = await RechargePlan.find(query).sort({ price: 1 });

    res.status(200).json({
      success: true,
      count: plans.length,
      data: plans,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single recharge plan by ID
// @route   GET /api/plans/:id
// @access  Public
export const getPlanById = async (req: Request, res: Response) => {
  try {
    const plan = await RechargePlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }

    res.status(200).json({ success: true, data: plan });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new recharge plan
// @route   POST /api/plans
// @access  Private/Admin
export const createPlan = async (req: Request, res: Response) => {
  try {
    const plan = await RechargePlan.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Plan created successfully',
      data: plan,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a recharge plan
// @route   PUT /api/plans/:id
// @access  Private/Admin
export const updatePlan = async (req: Request, res: Response) => {
  try {
    let plan = await RechargePlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }

    plan = await RechargePlan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Plan updated successfully',
      data: plan,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a recharge plan
// @route   DELETE /api/plans/:id
// @access  Private/Admin
export const deletePlan = async (req: Request, res: Response) => {
  try {
    const plan = await RechargePlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }

    await plan.deleteOne();

    res.status(200).json({ success: true, message: 'Plan removed' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
