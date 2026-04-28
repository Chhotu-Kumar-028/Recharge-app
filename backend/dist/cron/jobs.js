"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCronJobs = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const DataWallet_1 = __importDefault(require("../models/DataWallet"));
const MonthlyBill_1 = __importDefault(require("../models/MonthlyBill"));
const Notification_1 = __importDefault(require("../models/Notification"));
const sms_1 = require("../utils/sms");
const initCronJobs = () => {
    // 1. Low Data Reminders - Runs every hour to check wallets for the current day
    node_cron_1.default.schedule('0 * * * *', async () => {
        try {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            const activeWallets = await DataWallet_1.default.find({ date: { $gte: startOfDay } }).populate('userId');
            for (const wallet of activeWallets) {
                // If remaining data is less than 0.5 GB (500 MB)
                if (wallet.remainingData < 0.5 && wallet.remainingData > 0) {
                    const user = wallet.userId;
                    const message = `Alert: Your data balance is low (${wallet.remainingData.toFixed(2)} GB left). Top up to avoid interruption.`;
                    await Notification_1.default.create({
                        userId: user._id,
                        type: 'low_data',
                        message,
                    });
                    await (0, sms_1.sendSMS)(user.mobile, message);
                }
            }
            console.log('Cron Job: Low data alerts checked.');
        }
        catch (error) {
            console.error('Cron Error in Low Data Job:', error);
        }
    });
    // 2. Monthly Bill Due Reminders - Runs daily at 9:00 AM
    node_cron_1.default.schedule('0 9 * * *', async () => {
        try {
            const upcomingDueDate = new Date();
            upcomingDueDate.setDate(upcomingDueDate.getDate() + 3); // 3 days from now
            upcomingDueDate.setHours(0, 0, 0, 0);
            const endOfDueDay = new Date(upcomingDueDate);
            endOfDueDay.setHours(23, 59, 59, 999);
            const approachingBills = await MonthlyBill_1.default.find({
                status: 'unpaid',
                dueDate: { $gte: upcomingDueDate, $lte: endOfDueDay }
            }).populate('userId');
            for (const bill of approachingBills) {
                const user = bill.userId;
                const message = `Reminder: Your monthly data bill of ₹${bill.totalAmount} is due on ${bill.dueDate.toLocaleDateString()}. Please pay to avoid penalties.`;
                await Notification_1.default.create({
                    userId: user._id,
                    type: 'bill_due',
                    message,
                });
                await (0, sms_1.sendSMS)(user.mobile, message);
            }
            console.log('Cron Job: Bill reminders checked.');
        }
        catch (error) {
            console.error('Cron Error in Bill Reminder Job:', error);
        }
    });
    // 3. Plan Expiry Reminders - Runs daily at 10:00 AM (Mock Simulation)
    node_cron_1.default.schedule('0 10 * * *', async () => {
        try {
            // Assuming the user document had an `activePlanExpiry` date to check
            // Since it's not strictly modeled in the User yet, we will mock the process for users who might expire soon.
            // In a real system you'd do: User.find({ "activePlanExpiry" : { $lte: targetDate } })
            console.log('Cron Job: Plan expiry mock checked.');
        }
        catch (error) {
            console.error('Cron Error in Plan Expiry Job:', error);
        }
    });
    console.log('Background Cron Jobs Initialized Successfully');
};
exports.initCronJobs = initCronJobs;
