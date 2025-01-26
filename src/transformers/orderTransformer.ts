import { IOrder } from "../models/order";
import BaseTransformer from "./baseTransformer";

class OrderTransformer extends BaseTransformer {
  transform(order: IOrder): Partial<object> {
    return {
      id: order.id,
      code: order.code, // TODO - Should I ?
      courier: order.courier,
      events: order.events,
      created_at: order.createdAt,
      updated_at: order.updatedAt,
    };
  }
}

export default new OrderTransformer();
