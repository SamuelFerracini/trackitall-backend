import CourierEnum from "../enums/CourierEnum";
import AusPostProvider from "./AusPost";
import BaseCourier from "./BaseCourier";
import JTExpress from "./JTExpress";

export class CourierFactory {
  static make(type: CourierEnum): BaseCourier {
    const instance = {
      [CourierEnum.AUSPOST]: new AusPostProvider(),
      [CourierEnum.JTEXPRESS]: new JTExpress(),
    }[type];

    if (!instance) {
      throw new Error(`Courier ${type} not supported.`);
    }

    return instance;
  }
}
