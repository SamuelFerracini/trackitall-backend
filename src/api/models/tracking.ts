import mongoose, { Document, Schema } from "mongoose";
import { IOrder } from "./order";

export interface ITracking extends Document {
  reference: string;
  orders: Array<IOrder | string>;
  createdAt: string;
  updatedAt: string;
}

const TrackingSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: true,
    unique: true,
  },

  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],

  createdAt: {
    type: String,
    required: true,
  },

  updatedAt: {
    type: String,
    required: true,
  },
});

TrackingSchema.set("toObject", { virtuals: true });
TrackingSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Tracking", TrackingSchema);
