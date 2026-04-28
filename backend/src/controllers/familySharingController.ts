import { Response } from 'express';
import FamilySharing from '../models/FamilySharing';
import DataWallet from '../models/DataWallet';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

// @desc    Transfer unused data to a family member
// @route   POST /api/family-sharing
// @access  Private
export const shareData = async (req: AuthRequest, res: Response) => {
  try {
    const { receiverMobile, relation, dataAmount } = req.body;

    const senderId = req.user?.id;

    // Get Sender's Data Wallet for today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const senderWallet = await DataWallet.findOne({
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
    const receiver = await User.findOne({ mobile: receiverMobile });

    let status = 'success'; // default to success

    if (receiver) {
      // Add data to receiver if they exist on the platform
      let receiverWallet = await DataWallet.findOne({
        userId: receiver.id,
        date: { $gte: startOfDay },
      });

      if (receiverWallet) {
        receiverWallet.remainingData += dataAmount;
      } else {
        // Initialize an ad-hoc wallet with the shared amount
        receiverWallet = new DataWallet({
          userId: receiver.id,
          dailyData: 0,
          usedData: 0,
          remainingData: dataAmount,
          carryForwardData: dataAmount, // marking received as carry forward optionally
          date: new Date(),
        });
      }
      await receiverWallet.save();
    } else {
      // Receiver not on the platform, maybe they will receive an SMS via our mock service
      console.log(`[Mock Info] Target mobile ${receiverMobile} not registered. Proceeding loosely as 'success' for demo.`);
    }

    // Record the sharing transaction
    const familyShare = await FamilySharing.create({
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
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get data shares initiated by the user
// @route   GET /api/family-sharing/:userId
// @access  Private
export const getFamilyShares = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.id !== req.params.userId && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const shares = await FamilySharing.find({ senderId: req.params.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: shares.length,
      data: shares,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
