export interface IParcelHistory {
  description: string;
  date: string;
  location: string;
}

export default abstract class BaseCourier {
  abstract getParcelHistory(code: string): Promise<IParcelHistory[]>;
}
