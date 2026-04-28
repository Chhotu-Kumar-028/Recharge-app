import { Response } from 'express';
import EmergencyRecharge from '../models/EmergencyRecharge';
import { AuthRequest } from '../middleware/auth';

// @desc    Create a new emergency recharge request
// @route   POST /api/emergency-recharge
// @access  Private
export const createEmergencyRecharge = async (req: AuthRequest, res: Response) => {
  try {
    const { network, amount, reason } = req.body;

    const recharge = await EmergencyRecharge.create({
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
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all emergency recharges for a user
// @route   GET /api/emergency-recharge/:userId
// @access  Private
export const getUserEmergencyRecharges = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.id !== req.params.userId && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const recharges = await EmergencyRecharge.find({ userId: req.params.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: recharges.length,
      data: recharges,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update emergency recharge status
// @route   PUT /api/emergency-recharge/:id/status
// @access  Private/Admin
export const updateEmergencyRechargeStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body; // status: pending, approved, rejected, repaid
    
    let recharge = await EmergencyRecharge.findById(req.params.id);

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
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
