import express from 'express';
import { createInquiry, getInquiries, updateInquiryStatus } from '../controllers/inquiryController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createInquiry);       // Public: User sends message
router.get('/', protect, getInquiries); // Private: Admin reads messages
router.put('/:id', protect, updateInquiryStatus);

export default router;