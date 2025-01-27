import { ITracking } from "../models/tracking";
import BaseTransformer from "./baseTransformer";
import PublicOrderTransformer from "./publicOrderTransformer";

class PublicTrackingTransformer extends BaseTransformer {
  transform(tracking: ITracking): Partial<object> {
    return {
      reference: tracking.reference,
      created_at: tracking.createdAt,
      updated_at: tracking.updatedAt,
      orders: PublicOrderTransformer.transformCollection(tracking.orders).sort(
        (a, b) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();

          return dateB - dateA;
        }
      ),
    };
  }
}

export default new PublicTrackingTransformer();
