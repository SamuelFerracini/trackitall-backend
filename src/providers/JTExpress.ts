import AxiosService from "../services/AxiosService";
import FileManager from "../services/FileManagerService";
import BaseCourier, { IParcelHistory } from "./BaseCourier";

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

export default class JTExpress extends BaseCourier {
  axiosService: AxiosService;

  constructor() {
    super();

    this.axiosService = new AxiosService({
      baseURL:
        "https://websiteapi.jtexpress.co.th/jts-tha-website-api/api/v2/track/orderTrack",
    });
  }

  _formatResponse(response: IResponse): IParcelHistory[] {
    return response.data.details.map((e) => {
      return {
        date: new Date(e.scanTime).toISOString(),
        description: e.scanStatus,
        location: `${e.city}, ${e.area}, ${e.town}`,
      };
    });
  }

  async getParcelHistory(code: string): Promise<IParcelHistory[]> {
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

    debugger;

    return this._formatResponse(response.data);
  }
}
