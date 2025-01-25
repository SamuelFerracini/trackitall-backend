import Courier from "../enums/CourierEnum";
import { CourierFactory } from "../providers/CourierFactory";

interface TrackingCode {
  code: string;
  provider: string;
  children?: TrackingCode[];
}

export default class TrackingService {
  async processTrackingCodes(codes: TrackingCode[]): Promise<any[]> {
    const result: any[] = [];

    for (const codeObj of codes) {
      const processedCode = await this.fetchHistoryAndProcessChildren(codeObj);
      result.push(processedCode);
    }

    debugger;

    return result;
  }

  private async fetchHistoryAndProcessChildren(
    codeObj: TrackingCode
  ): Promise<any> {
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

      return {
        code: codeObj.code,
        provider: codeObj.provider,
        history,
        children,
      };
    } catch (error) {
      console.error(`Error processing code ${codeObj.code}:`, error);
      return {
        code: codeObj.code,
        provider: codeObj.provider,
        history: null,
        children: [],
      };
    }
  }
}
