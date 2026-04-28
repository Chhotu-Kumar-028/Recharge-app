"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const RechargePlan_1 = __importDefault(require("../models/RechargePlan"));
const WifiLocation_1 = __importDefault(require("../models/WifiLocation"));
const db_1 = __importDefault(require("../config/db"));
dotenv_1.default.config();
const samplePlans = [
    {
        network: 'Jio',
        price: 299,
        validity: 28,
        dataPerDay: 2,
        unlimitedCalls: true,
        smsIncluded: 100,
        category: 'Popular',
        description: 'Best for daily heavy data users',
    },
    {
        network: 'Airtel',
        price: 479,
        validity: 56,
        dataPerDay: 1.5,
        unlimitedCalls: true,
        smsIncluded: 100,
        category: 'Validity',
        description: 'Longer validity with sufficient data',
    },
    {
        network: 'Vi',
        price: 199,
        validity: 18,
        dataPerDay: 1,
        unlimitedCalls: true,
        smsIncluded: 100,
        category: 'Affordable',
        description: 'Budget-friendly short term plan',
    },
];
const sampleWifi = [
    {
        placeName: 'Central Library',
        address: '123 Study Lane, Knowledge City',
        city: 'Mumbai',
        type: 'Library',
        wifiSpeed: 'High',
        timing: '09:00 AM - 08:00 PM',
        latitude: 19.0760,
        longitude: 72.8777,
    },
    {
        placeName: 'Tech Cafe',
        address: '45 Hacker Way',
        city: 'Bangalore',
        type: 'Cafe',
        wifiSpeed: 'Medium',
        timing: '10:00 AM - 11:00 PM',
        latitude: 12.9716,
        longitude: 77.5946,
    },
];
const importData = async () => {
    try {
        await (0, db_1.default)();
        await RechargePlan_1.default.deleteMany();
        await WifiLocation_1.default.deleteMany();
        await RechargePlan_1.default.insertMany(samplePlans);
        await WifiLocation_1.default.insertMany(sampleWifi);
        console.log('Data Imported Successfully!');
        process.exit();
    }
    catch (error) {
        console.error('Error with data import', error);
        process.exit(1);
    }
};
if (process.argv[2] === '-d') {
    // Can be used to destroy data
}
else {
    importData();
}
