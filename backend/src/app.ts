import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Route imports
import authRoutes from './routes/authRoutes';
import rechargePlanRoutes from './routes/rechargePlanRoutes';
import helpRequestRoutes from './routes/helpRequestRoutes';
import donationRoutes from './routes/donationRoutes';
import dataWalletRoutes from './routes/dataWalletRoutes';
import monthlyBillRoutes from './routes/monthlyBillRoutes';
import notificationRoutes from './routes/notificationRoutes';
import emergencyRechargeRoutes from './routes/emergencyRechargeRoutes';
import familySharingRoutes from './routes/familySharingRoutes';
import freeWifiRoutes from './routes/freeWifiRoutes';
import fundingCampaignRoutes from './routes/fundingCampaignRoutes';
import adminRoutes from './routes/adminRoutes';

// Global Error Handler
import { errorHandler } from './middleware/error';

// Cron Jobs
import { initCronJobs } from './cron/jobs';

dotenv.config();

const app: Application = express();

// Init Background Cron Jobs
initCronJobs();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://recharge-app-ten.vercel.app',
  process.env.CLIENT_URL
].filter(Boolean) as string[];

app.use(cors({ 
  origin: allowedOrigins, 
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup static folder for uploads (if using local storage with Multer)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Basic route for testing
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Recharge Saathi API is running perfectly' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/plans', rechargePlanRoutes);
app.use('/api/help-request', helpRequestRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/data-wallet', dataWalletRoutes);
app.use('/api/bills', monthlyBillRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/emergency-recharge', emergencyRechargeRoutes);
app.use('/api/family-sharing', familySharingRoutes);
app.use('/api/free-wifi', freeWifiRoutes);
app.use('/api/funding', fundingCampaignRoutes);
app.use('/api/admin', adminRoutes);

// Fallback for 404 API routes
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// Use global error handler middleware
app.use(errorHandler);

export default app;
