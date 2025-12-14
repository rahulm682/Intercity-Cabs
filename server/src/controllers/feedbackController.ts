import { Request, Response } from 'express';
import Feedback from '../models/Feedback.js';

// @desc    Get all APPROVED feedbacks (Public)
// @route   GET /api/feedbacks
export const getPublicFeedbacks = async (req: Request, res: Response) => {
  try {
    const feedbacks = await Feedback.find({ isApproved: true }).sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create feedback (Public)
// @route   POST /api/feedbacks
export const createFeedback = async (req: Request, res: Response) => {
  try {
    const { name, rating, comment } = req.body;
    const feedback = await Feedback.create({ name, rating, comment });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// @desc    Get ALL feedbacks (Admin)
// @route   GET /api/feedbacks/admin
export const getAllFeedbacks = async (req: Request, res: Response) => {
  try {
    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Approve/Reject feedback (Admin)
// @route   PUT /api/feedbacks/:id
export const updateFeedbackStatus = async (req: Request, res: Response) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (feedback) {
      feedback.isApproved = req.body.isApproved;
      await feedback.save();
      res.json(feedback);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete feedback (Admin)
// @route   DELETE /api/feedbacks/:id
export const deleteFeedback = async (req: Request, res: Response) => {
    try {
      const feedback = await Feedback.findById(req.params.id);
      if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
  
      await feedback.deleteOne();
      res.json({ message: 'Feedback removed' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };