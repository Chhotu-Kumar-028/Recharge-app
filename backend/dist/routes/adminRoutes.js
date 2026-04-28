"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Apply protection and strictly admin authorization to all routes in this file
router.use(auth_1.protect);
router.use((0, auth_1.authorize)('admin'));
router.get('/dashboard', adminController_1.getDashboardMetrics);
exports.default = router;
