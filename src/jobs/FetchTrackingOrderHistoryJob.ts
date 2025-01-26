import { IOrder } from "../models/order";
import CourierService from "../services/courierService";

class FetchTrackingOrderHistoryJob {
  async execute(orders: IOrder[]) {
    await Promise.all(
      orders.map(async (order: IOrder | string) => {
        if (typeof order == "string") {
          throw new Error("Cannot process tring");
        }

        const events = await CourierService.fetchEventHistory(
          order.code,
          order.courier
        );

        await order.updateOne({ events });
      })
    );
  }
}

export default new FetchTrackingOrderHistoryJob();
