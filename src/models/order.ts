import mongoose, { Document } from "mongoose";
import Courier from "../enums/courierType";

export interface IOrderEvents {
  date: string;
  description: string;
  status: string;
  location: string;
}

export interface IOrder extends Document {
  code: string;
  courier: string;
  events: IOrderEvents[];
  createdAt: string;
  updatedAt: string;
}

const OrderSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },

  courier: {
    type: String,
    required: Courier,
  },

  events: {
    type: Array<IOrderEvents>,
    default: [],
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

export default mongoose.model("Order", OrderSchema);
