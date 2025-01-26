import Courier from "../enums/courierType";
import { CourierFactory } from "../couriers/courierFactory";
// import { ITrackingHistoryDataEvent } from "../models/trackingHistory";

export default class CourierService {
  async fetchEventHistory(code: string, courier: Courier): Promise<void> {
    // const instance = CourierFactory.make(courier);
    // return await instance.getOrderHistoryEvents(code);
  }
}
