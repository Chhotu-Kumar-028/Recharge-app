"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsRead = exports.createNotification = exports.getUserNotifications = void 0;
const Notification_1 = __importDefault(require("../models/Notification"));
// @desc    Get user notifications
// @route   GET /api/notifications/:userId
// @access  Private
const getUserNotifications = async (req, res) => {
    try {
        if (req.user?.id !== req.params.userId && req.user?.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        const notifications = await Notification_1.default.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: notifications.length,
            data: notifications,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getUserNotifications = getUserNotifications;
// @desc    Create a new notification manually
// @route   POST /api/notifications
// @access  Private/Admin
const createNotification = async (req, res) => {
    try {
        const { userId, type, message } = req.body;
        const notification = await Notification_1.default.create({
            userId,
            type,
            message,
        });
        res.status(201).json({
            success: true,
            data: notification,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createNotification = createNotification;
// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
const markAsRead = async (req, res) => {
    try {
        const notification = await Notification_1.default.findById(req.params.id);
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.markAsRead = markAsRead;
