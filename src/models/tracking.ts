import mongoose, { Document } from "mongoose";

export interface ITracking extends Document {
  reference: string;
  orderIds: Array<string>;
  createdAt: string;
  updatedAt: string;
}

const TrackingSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: true,
    unique: true,
  },

  orderIds: {
    type: Array<string>,
    required: true,
  },

  createdAt: {
    type: String,
    required: true,
  },

  updatedAt: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Tracking", TrackingSchema);
