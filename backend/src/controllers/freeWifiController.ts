import { Request, Response } from 'express';
import WifiLocation from '../models/WifiLocation';

// @desc    Get all free Wi-Fi locations
// @route   GET /api/free-wifi
// @access  Public
export const getFreeWifiLocations = async (req: Request, res: Response) => {
  try {
    const { city } = req.query;

    let query: any = {};
    if (city) {
      query.city = { $regex: new RegExp(city as string, 'i') }; // Case-insensitive exact or partial match
    }

    const locations = await WifiLocation.find(query);

    res.status(200).json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add a new free Wi-Fi location
// @route   POST /api/free-wifi
// @access  Private/Admin
export const addFreeWifiLocation = async (req: Request, res: Response) => {
  try {
    const location = await WifiLocation.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Wi-Fi location added successfully',
      data: location,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
