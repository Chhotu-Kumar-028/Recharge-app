import { Response } from 'express';
import HelpRequest from '../models/HelpRequest';
import { AuthRequest } from '../middleware/auth';

// @desc    Create a new help request
// @route   POST /api/help-request
// @access  Private
export const createHelpRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { amountNeeded, reason, occupation, city } = req.body;

    const request = await HelpRequest.create({
      userId: req.user?.id,
      amountNeeded,
      reason,
      occupation,
      city,
    });

    res.status(201).json({
      success: true,
      message: 'Help request submitted successfully',
      data: request,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all help requests (with optional status filter)
// @route   GET /api/help-request
// @access  Public (or Private depending on requirements, let's say Public to see campaigns)
export const getHelpRequests = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.query;
    
    let query: any = {};
    if (status) query.status = status;

    const requests = await HelpRequest.find(query)
      .populate('userId', 'name city') // populate user details
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update help request status
// @route   PUT /api/help-request/:id/status
// @access  Private/Admin
export const updateHelpRequestStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body; // status should be 'approved' or 'rejected'
    
    let request = await HelpRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ success: false, message: 'Help request not found' });
    }

    request.status = status;
    await request.save();

    res.status(200).json({
      success: true,
      message: `Help request ${status}`,
      data: request,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
