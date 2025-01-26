import mongoose, { Document } from "mongoose";

export interface ITracking extends Document {
  id: string;
  reference: string;
  data: any;
}

const TrackingSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },

  reference: {
    type: String,
    required: true,
    unique: true,
  },

  data: {
    type: Object,
    required: true,
  },
});

export default mongoose.model("Tracking", TrackingSchema);
