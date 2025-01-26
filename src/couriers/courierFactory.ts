import CourierType from "../enums/courierType";
import AusPostProvider from "./ausPost";
import BaseCourier from "./baseCourier";
import JteExpress from "./jteExpress";

export class CourierFactory {
  static make(type: CourierType): BaseCourier {
    const instance = {
      [CourierType.AUSPOST]: new AusPostProvider(),
      [CourierType.JTEXPRESS]: new JteExpress(),
    }[type];

    if (!instance) {
      throw new Error(`Courier ${type} not supported.`);
    }

    return instance;
  }
}
