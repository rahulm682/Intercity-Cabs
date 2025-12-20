import express from "express";
import {
  getPublicFeedbacks,
  createFeedback,
  getAllFeedbacks,
  updateFeedbackStatus,
  deleteFeedback,
} from "../controllers/feedbackController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPublicFeedbacks);
router.post("/", createFeedback);
router.get("/admin", protect, getAllFeedbacks);
router.put("/:id", protect, updateFeedbackStatus);
router.delete("/:id", protect, deleteFeedback);

export default router;
