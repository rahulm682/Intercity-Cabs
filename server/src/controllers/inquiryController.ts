import { Request, Response } from "express";
import Inquiry from "../models/Inquiry.js";
import sendEmail from "../utils/emailService.js";

// @desc    Create new inquiry (Public)
// @route   POST /api/inquiries
export const createInquiry = async (req: Request, res: Response) => {
  try {
    const { name, mobile, message, routeInfo, journeyDate } = req.body;
    if (!name || !mobile)
      return res.status(400).json({ message: "Name and Mobile are required" });

    const inquiry = await Inquiry.create({
      name,
      mobile,
      message,
      routeInfo,
      journeyDate,
    });

    const emailText = `
New Inquiry Received!

Name: ${name}
Mobile: ${mobile}
Route: ${routeInfo}
Date: ${req.body.journeyDate || "Not specified"}
Message: ${message}
`;

    // Don't await this, let it run in background so user doesn't wait
    // TODO: not sending the mail right now
    // sendEmail(
    //   process.env.ADMIN_EMAIL as string,
    //   `New Booking: ${routeInfo}`,
    //   emailText
    // );
    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get all inquiries (Admin)
// @route   GET /api/inquiries
export const getInquiries = async (req: Request, res: Response) => {
  try {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id
export const updateInquiryStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findById(req.params.id);

    if (inquiry) {
      inquiry.status = status;
      const updatedInquiry = await inquiry.save();
      res.json(updatedInquiry);
    } else {
      res.status(404).json({ message: "Inquiry not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
