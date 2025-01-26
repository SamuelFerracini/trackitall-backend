import Courier from "../enums/courierType";
import { CourierFactory } from "../couriers/courierFactory";
import { ITrackingCode, ITrackingHistory } from "../interfaces/tracking";

export class CourierService {
  async fetchHistoryAndProcessChildren(
    codeObj: ITrackingCode
  ): Promise<ITrackingHistory> {
    try {
      const instance = CourierFactory.make(codeObj.provider as Courier);
      const history = await instance.getParcelHistory(codeObj.code);

      const children = codeObj.children
        ? await Promise.all(
            codeObj.children.map((child) =>
              this.fetchHistoryAndProcessChildren(child)
            )
          )
        : [];

      return { ...codeObj, history, children };
    } catch (error) {
      console.error(`Error processing code ${codeObj.code}:`, error);
      return { ...codeObj, history: [], children: [] };
    }
  }
}
