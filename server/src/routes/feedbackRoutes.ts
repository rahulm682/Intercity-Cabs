import express from 'express';
import { 
  getPublicFeedbacks, createFeedback, 
  getAllFeedbacks, updateFeedbackStatus, deleteFeedback 
} from '../controllers/feedbackController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPublicFeedbacks);               // Public: Read Approved
router.post('/', createFeedback);                  // Public: Write Review
router.get('/admin', protect, getAllFeedbacks);    // Admin: Read All
router.put('/:id', protect, updateFeedbackStatus); // Admin: Approve
router.delete('/:id', protect, deleteFeedback);    // Admin: Delete

export default router;