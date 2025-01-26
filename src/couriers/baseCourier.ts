import { ITrackingHistoryDataEvent } from "../models/trackingHistory";

export default abstract class BaseCourier {
  abstract getOrderHistoryEvents(code: string): Promise<ITrackingHistoryDataEvent[]>;
}
