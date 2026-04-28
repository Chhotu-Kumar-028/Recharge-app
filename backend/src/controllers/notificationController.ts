import { Response } from 'express';
import Notification from '../models/Notification';
import { AuthRequest } from '../middleware/auth';

// @desc    Get user notifications
// @route   GET /api/notifications/:userId
// @access  Private
export const getUserNotifications = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.id !== req.params.userId && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new notification manually
// @route   POST /api/notifications
// @access  Private/Admin
export const createNotification = async (req: AuthRequest, res: Response) => {
  try {
    const { userId, type, message } = req.body;

    const notification = await Notification.create({
      userId,
      type,
      message,
    });

    res.status(201).json({
      success: true,
      data: notification,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    // Ensure the user owns the notification
    if (notification.userId.toString() !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    notification.read = true;
    await notification.save();

    res.status(200).json({
      success: true,
      message: 'Notification marked as read',
      data: notification,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
