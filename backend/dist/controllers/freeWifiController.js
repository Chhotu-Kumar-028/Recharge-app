"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFreeWifiLocation = exports.getFreeWifiLocations = void 0;
const WifiLocation_1 = __importDefault(require("../models/WifiLocation"));
// @desc    Get all free Wi-Fi locations
// @route   GET /api/free-wifi
// @access  Public
const getFreeWifiLocations = async (req, res) => {
    try {
        const { city } = req.query;
        let query = {};
        if (city) {
            query.city = { $regex: new RegExp(city, 'i') }; // Case-insensitive exact or partial match
        }
        const locations = await WifiLocation_1.default.find(query);
        res.status(200).json({
            success: true,
            count: locations.length,
            data: locations,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getFreeWifiLocations = getFreeWifiLocations;
// @desc    Add a new free Wi-Fi location
// @route   POST /api/free-wifi
// @access  Private/Admin
const addFreeWifiLocation = async (req, res) => {
    try {
        const location = await WifiLocation_1.default.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Wi-Fi location added successfully',
            data: location,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.addFreeWifiLocation = addFreeWifiLocation;
