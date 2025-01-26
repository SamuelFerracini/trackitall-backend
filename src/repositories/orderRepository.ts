import Order, { IOrder } from "../models/order";
import { BaseRepository } from "./baseRepository";

export class OrderRepository extends BaseRepository<IOrder> {
  constructor() {
    super(Order);
  }
}
