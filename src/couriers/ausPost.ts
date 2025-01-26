import BrowserService from "../services/browserService";
import FileManagerService from "../services/fileManagerService";
import BaseCourier, { IHistoryEvent } from "./baseCourier";

interface IResponseArticleDetailEvent {
  dateTime: number;
  localeDateTime: string;
  description: string;
  location: string;
  eventCode: string;
  wcid: string;
  toWcid: string | null;
  readyToCollectDateTime: string | null;
  milestone: string;
  hasLocationDualName: boolean;
}

interface IResponseArticleDetail {
  events: IResponseArticleDetailEvent[];
}

interface IResponseArticle {
  details: IResponseArticleDetail[];
}

interface IResponse {
  status: string;
  articles: IResponseArticle[];
}

export default class AusPostProvider extends BaseCourier {
  browserService: BrowserService;

  constructor() {
    super();

    this.browserService = new BrowserService();
  }

  _formatResponse(response: IResponse): IHistoryEvent[] {
    const [article] = response.articles;

    const [detail] = article.details;

    const history: IHistoryEvent[] = detail.events.map((e) => {
      return {
        description: e.description,
        date: new Date(e.dateTime).toISOString(),
        location: e.location,
        status: null,
      };
    });

    return history;
  }

  async _getParcelHistory(code: string): Promise<IResponse | null> {
    const res = await FileManagerService.readFile("./aupost-example.json");

    if (!res) {
      return null;
    }

    // TODO - Make request
    return JSON.parse(res?.toString());
  }

  async getOrderHistoryEvents(code: string): Promise<IHistoryEvent[]> {
    const postResponse = await this._getParcelHistory(code);

    if (!postResponse) {
      return [];
    }

    return this._formatResponse(postResponse);
  }
}
