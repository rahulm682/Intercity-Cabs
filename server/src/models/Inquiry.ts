import mongoose, { Document, Schema } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  mobile: string;
  message: string;
  routeInfo: string; // e.g., "Surat to Mumbai (Sedan)"
  journeyDate: Date;
  status: "New" | "Contacted" | "Booked" | "Cancelled";
  createdAt: Date;
}

const InquirySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    message: { type: String },
    routeInfo: { type: String, required: true },
    journeyDate: { type: Date },
    status: {
      type: String,
      enum: ["New", "Contacted", "Booked", "Cancelled"],
      default: "New",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IInquiry>("Inquiry", InquirySchema);
