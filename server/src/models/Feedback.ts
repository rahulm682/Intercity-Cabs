import mongoose, { Document, Schema } from 'mongoose';

export interface IFeedback extends Document {
  name: string;
  rating: number; // 1 to 5
  comment: string;
  isApproved: boolean; // Moderation flag
}

const FeedbackSchema: Schema = new Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  isApproved: { type: Boolean, default: false }, // Hidden by default
}, { timestamps: true });

export default mongoose.model<IFeedback>('Feedback', FeedbackSchema);