import Order, { IOrder } from "../models/order";
import { BaseRepository } from "./baseRepository";

class OrderRepository extends BaseRepository<IOrder> {
  constructor() {
    super(Order);
  }
}

export default new OrderRepository();
