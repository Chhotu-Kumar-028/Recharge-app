import cron from 'node-cron';
import DataWallet from '../models/DataWallet';
import MonthlyBill from '../models/MonthlyBill';
import Notification from '../models/Notification';
import User from '../models/User';
import { sendSMS } from '../utils/sms';

export const initCronJobs = () => {
  // 1. Low Data Reminders - Runs every hour to check wallets for the current day
  cron.schedule('0 * * * *', async () => {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const activeWallets = await DataWallet.find({ date: { $gte: startOfDay } }).populate('userId');

      for (const wallet of activeWallets) {
        // If remaining data is less than 0.5 GB (500 MB)
        if (wallet.remainingData < 0.5 && wallet.remainingData > 0) {
          const user: any = wallet.userId;
          
          const message = `Alert: Your data balance is low (${wallet.remainingData.toFixed(2)} GB left). Top up to avoid interruption.`;
          
          await Notification.create({
            userId: user._id,
            type: 'low_data',
            message,
          });

          await sendSMS(user.mobile, message);
        }
      }
      console.log('Cron Job: Low data alerts checked.');
    } catch (error) {
      console.error('Cron Error in Low Data Job:', error);
    }
  });

  // 2. Monthly Bill Due Reminders - Runs daily at 9:00 AM
  cron.schedule('0 9 * * *', async () => {
    try {
      const upcomingDueDate = new Date();
      upcomingDueDate.setDate(upcomingDueDate.getDate() + 3); // 3 days from now
      upcomingDueDate.setHours(0,0,0,0);
      
      const endOfDueDay = new Date(upcomingDueDate);
      endOfDueDay.setHours(23, 59, 59, 999);

      const approachingBills = await MonthlyBill.find({
        status: 'unpaid',
        dueDate: { $gte: upcomingDueDate, $lte: endOfDueDay }
      }).populate('userId');

      for (const bill of approachingBills) {
        const user: any = bill.userId;
        const message = `Reminder: Your monthly data bill of ₹${bill.totalAmount} is due on ${bill.dueDate.toLocaleDateString()}. Please pay to avoid penalties.`;
        
        await Notification.create({
          userId: user._id,
          type: 'bill_due',
          message,
        });

        await sendSMS(user.mobile, message);
      }
      console.log('Cron Job: Bill reminders checked.');
    } catch (error) {
       console.error('Cron Error in Bill Reminder Job:', error);
    }
  });

  // 3. Plan Expiry Reminders - Runs daily at 10:00 AM (Mock Simulation)
  cron.schedule('0 10 * * *', async () => {
    try {
       // Assuming the user document had an `activePlanExpiry` date to check
       // Since it's not strictly modeled in the User yet, we will mock the process for users who might expire soon.
       // In a real system you'd do: User.find({ "activePlanExpiry" : { $lte: targetDate } })
       
       console.log('Cron Job: Plan expiry mock checked.');
    } catch (error) {
       console.error('Cron Error in Plan Expiry Job:', error);
    }
  });

  console.log('Background Cron Jobs Initialized Successfully');
};
