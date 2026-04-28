"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Route imports
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const rechargePlanRoutes_1 = __importDefault(require("./routes/rechargePlanRoutes"));
const helpRequestRoutes_1 = __importDefault(require("./routes/helpRequestRoutes"));
const donationRoutes_1 = __importDefault(require("./routes/donationRoutes"));
const dataWalletRoutes_1 = __importDefault(require("./routes/dataWalletRoutes"));
const monthlyBillRoutes_1 = __importDefault(require("./routes/monthlyBillRoutes"));
const notificationRoutes_1 = __importDefault(require("./routes/notificationRoutes"));
const emergencyRechargeRoutes_1 = __importDefault(require("./routes/emergencyRechargeRoutes"));
const familySharingRoutes_1 = __importDefault(require("./routes/familySharingRoutes"));
const freeWifiRoutes_1 = __importDefault(require("./routes/freeWifiRoutes"));
const fundingCampaignRoutes_1 = __importDefault(require("./routes/fundingCampaignRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
// Global Error Handler
const error_1 = require("./middleware/error");
// Cron Jobs
const jobs_1 = require("./cron/jobs");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Init Background Cron Jobs
(0, jobs_1.initCronJobs)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Setup static folder for uploads (if using local storage with Multer)
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Basic route for testing
app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Recharge Saathi API is running perfectly' });
});
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/plans', rechargePlanRoutes_1.default);
app.use('/api/help-request', helpRequestRoutes_1.default);
app.use('/api/donations', donationRoutes_1.default);
app.use('/api/data-wallet', dataWalletRoutes_1.default);
app.use('/api/bills', monthlyBillRoutes_1.default);
app.use('/api/notifications', notificationRoutes_1.default);
app.use('/api/emergency-recharge', emergencyRechargeRoutes_1.default);
app.use('/api/family-sharing', familySharingRoutes_1.default);
app.use('/api/free-wifi', freeWifiRoutes_1.default);
app.use('/api/funding', fundingCampaignRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
// Fallback for 404 API routes
app.use('*', (req, res) => {
    res.status(404).json({ success: false, message: 'API route not found' });
});
// Use global error handler middleware
app.use(error_1.errorHandler);
exports.default = app;
