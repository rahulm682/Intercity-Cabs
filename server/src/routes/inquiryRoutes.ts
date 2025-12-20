import express from "express";
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
} from "../controllers/inquiryController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createInquiry);
router.get("/", protect, getInquiries);
router.put("/:id", protect, updateInquiryStatus);

export default router;
