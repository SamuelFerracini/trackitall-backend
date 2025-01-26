// interfaces/tracking.ts
import { IParcelHistory } from "../couriers/baseCourier";

export interface ITrackingCode {
  code: string;
  provider: string;
  children?: ITrackingCode[];
}

export interface ITrackingHistory extends ITrackingCode {
  history: IParcelHistory[];
}
