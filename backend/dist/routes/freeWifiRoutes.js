"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const freeWifiController_1 = require("../controllers/freeWifiController");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const router = express_1.default.Router();
const wifiValidation = [
    (0, express_validator_1.body)('placeName', 'Place name is required').not().isEmpty(),
    (0, express_validator_1.body)('address', 'Address is required').not().isEmpty(),
    (0, express_validator_1.body)('city', 'City is required').not().isEmpty(),
    (0, express_validator_1.body)('type', 'Type of location is required').not().isEmpty(),
    (0, express_validator_1.body)('timing', 'Timing is required').not().isEmpty(),
    (0, express_validator_1.body)('latitude', 'Latitude is required and must be a number').isNumeric(),
    (0, express_validator_1.body)('longitude', 'Longitude is required and must be a number').isNumeric(),
];
// Public route to view Wi-Fi locations
router.get('/', freeWifiController_1.getFreeWifiLocations);
// Admin route to add new Wi-Fi locations
router.post('/', auth_1.protect, (0, auth_1.authorize)('admin'), (0, validate_1.validate)(wifiValidation), freeWifiController_1.addFreeWifiLocation);
exports.default = router;
