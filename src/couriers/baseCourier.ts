import {} from "../interfaces/tracking";

export interface IHistoryEvent {
  date: string;
  description: string;
  status: string | null;
  location: string;
}

export default abstract class BaseCourier {
  abstract getOrderHistoryEvents(code: string): Promise<IHistoryEvent[]>;
}
