import Courier from "../enums/courierType";
import { CourierFactory } from "../couriers/courierFactory";
import { IHistoryEvent } from "../couriers/baseCourier";

class CourierService {
  async fetchEventHistory(
    code: string,
    courier: Courier
  ): Promise<IHistoryEvent[]> {
    const instance = CourierFactory.make(courier);

    return await instance.getOrderHistoryEvents(code);
  }
}

export default new CourierService();
