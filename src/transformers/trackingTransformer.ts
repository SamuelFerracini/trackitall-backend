import { ITracking } from "../models/tracking";
import BaseTransformer from "./baseTransformer";
import OrderTransformer from "./orderTransformer";

class TrackingTransformer extends BaseTransformer {
  constructor() {
    super();
  }

  transform(tracking: ITracking): Partial<object> {
    return {
      reference: tracking.reference,
      created_at: tracking.createdAt,
      updated_at: tracking.updatedAt,
      orders: OrderTransformer.transformCollection(tracking.orders),
    };
  }
}

export default new TrackingTransformer();
