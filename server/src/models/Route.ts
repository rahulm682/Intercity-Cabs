import mongoose, { Document, Schema } from 'mongoose';

export interface IRoute extends Document {
  source: string;
  destination: string;
  price: number;
  vehicleType: 'Sedan' | 'SUV' | 'Luxury';
  description: string;
  isAvailable: boolean;
}

const RouteSchema: Schema = new Schema({
  source: { type: String, required: true },
  destination: { type: String, required: true },
  price: { type: Number, required: true },
  vehicleType: { type: String, required: true, enum: ['Sedan', 'SUV', 'Luxury'] },
  description: { type: String },
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<IRoute>('Route', RouteSchema);