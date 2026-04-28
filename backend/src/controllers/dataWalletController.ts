import { Response } from 'express';
import DataWallet from '../models/DataWallet';
import { AuthRequest } from '../middleware/auth';

// @desc    Get data wallet for a specific user (Current Day)
// @route   GET /api/data-wallet/:userId
// @access  Private
export const getDataWallet = async (req: AuthRequest, res: Response) => {
  try {
    // Only allow users to access their own data, or admin
    if (req.user?.id !== req.params.userId && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to access this data' });
    }

    // Get today's start date
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    let wallet = await DataWallet.findOne({
      userId: req.params.userId,
      date: { $gte: startOfDay },
    });

    if (!wallet) {
      // If no wallet exists for today, fetch yesterday's to calculate carry forward
      const yesterday = new Date(startOfDay);
      yesterday.setDate(yesterday.getDate() - 1);

      const pastWallet = await DataWallet.findOne({
        userId: req.params.userId,
        date: { $gte: yesterday, $lt: startOfDay },
      });

      // Simple Initialization (Assuming 2GB daily limit for mock purposes, this should ideally come from the user's active plan)
      const dailyAllowance = 2; 
      let carryForward = 0;

      if (pastWallet) {
        carryForward = pastWallet.remainingData;
      }

      wallet = await DataWallet.create({
        userId: req.params.userId,
        dailyData: dailyAllowance,
        usedData: 0,
        remainingData: dailyAllowance + carryForward,
        carryForwardData: carryForward,
        extraDataUsed: 0,
        date: new Date(),
      });
    }

    res.status(200).json({ success: true, data: wallet });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update data usage (Mocking usage simulation)
// @route   POST /api/data-wallet/update
// @access  Private
// Logic: Calculate extra data usage, update remaining.
export const updateDataUsage = async (req: AuthRequest, res: Response) => {
  try {
    const { userId, dataConsumed } = req.body; // dataConsumed in GB

    // Security check
    if (req.user?.id !== userId && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    let wallet = await DataWallet.findOne({
      userId,
      date: { $gte: startOfDay },
    });

    if (!wallet) {
      return res.status(404).json({ success: false, message: 'Data wallet for today not found. Please access it first to initialize.' });
    }

    wallet.usedData += dataConsumed;
    
    const totalAvailable = wallet.dailyData + wallet.carryForwardData;
    
    if (wallet.usedData <= totalAvailable) {
      wallet.remainingData = totalAvailable - wallet.usedData;
    } else {
      wallet.remainingData = 0;
      wallet.extraDataUsed = wallet.usedData - totalAvailable;
    }

    await wallet.save();

    res.status(200).json({
      success: true,
      message: 'Data usage updated',
      data: wallet,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get monthly summary of data usage
// @route   GET /api/data-wallet/monthly-summary/:userId
// @access  Private
export const getMonthlySummary = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.id !== req.params.userId && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const wallets = await DataWallet.find({
      userId: req.params.userId,
      date: { $gte: startOfMonth },
    });

    // Calculate total extra data used this month
    const totalExtraData = wallets.reduce((acc, curr) => acc + curr.extraDataUsed, 0);

    res.status(200).json({
      success: true,
      data: {
        totalExtraData,
        records: wallets,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
