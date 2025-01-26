import AxiosService from "../services/axiosService";
import FileManager from "../services/fileManagerService";
import BaseCourier, { IHistoryEvent } from "./baseCourier";

interface IReponseDataDetail {
  remark: string | null;
  acceptTime: string;
  state: string;
  city: string;
  area: string;
  town: string;
  returnReason: string | null;
  scansCode: string;
  scanTypeForCode: string;
  scanStatus: string;
  scanTime: string;
  latitude: string | null;
  longitude: string | null;
  deliveryName: string | null;
  deliveryPhone: string | null;
  signer: string | null;
  siteName: string;
  nextSite: string;
}

interface IReponseData {
  details: IReponseDataDetail[];
}

interface IResponse {
  data: IReponseData;
}

export default class JteExpress extends BaseCourier {
  axiosService: AxiosService;

  constructor() {
    super();

    this.axiosService = new AxiosService({
      baseURL:
        "https://websiteapi.jtexpress.co.th/jts-tha-website-api/api/v2/track/orderTrack",
    });
  }

  _formatResponse(response: IResponse): IHistoryEvent[] {
    return response.data.details.map((e) => {
      const descriptions = [];

      if (e.deliveryPhone) {
        descriptions.push(`Courier phone number: ${e.deliveryPhone}`);
      }

      return {
        date: new Date(e.scanTime).toISOString(),
        status: e.scanStatus,
        description: descriptions.join(". "),
        location: `${e.city}, ${e.area}, ${e.town}`,
      };
    });
  }

  async getOrderHistoryEvents(code: string): Promise<IHistoryEvent[]> {
    // const response = await this.axiosService.post<IResponse>("", {
    //   billCode: code,
    //   lang: "en",
    //   phoneVerify: process.env.LAST_4,
    // });

    const t = (
      await FileManager.readFile("./tsexpress-example.json")
    )?.toString() as string;

    const response = {
      data: JSON.parse(t),
    };

    return this._formatResponse(response.data);
  }
}
