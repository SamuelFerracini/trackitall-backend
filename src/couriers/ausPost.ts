// import BrowserService from "../services/browserService";
// import FileManagerService from "../services/fileManagerService";
// import BaseCourier, { IHistoryEvent } from "./baseCourier";

// interface IResponseArticleDetailEvent {
//   dateTime: number;
//   localeDateTime: string;
//   description: string;
//   location: string;
//   eventCode: string;
//   wcid: string;
//   toWcid: string | null;
//   readyToCollectDateTime: string | null;
//   milestone: string;
//   hasLocationDualName: boolean;
// }

// interface IResponseArticleDetail {
//   events: IResponseArticleDetailEvent[];
// }

// interface IResponseArticle {
//   details: IResponseArticleDetail[];
// }

// interface IResponse {
//   status: string;
//   articles: IResponseArticle[];
// }

// export default class AusPostProvider extends BaseCourier {
//   browserService: BrowserService;

//   constructor() {
//     super();

//     this.browserService = new BrowserService();
//   }

//   _formatResponse(response: IResponse): IHistoryEvent[] {
//     if (!response.articles) {
//       return [];
//     }

//     const [article] = response.articles;

//     const [detail] = article.details;

//     const history: IHistoryEvent[] = detail.events.map((e) => {
//       return {
//         description: e.description,
//         date: new Date(e.dateTime).toISOString(),
//         location: e.location,
//         status: null,
//       };
//     });

//     return history;
//   }

//   async _getParcelHistory(code: string): Promise<IResponse | null> {
//     await this.browserService.initialize();

//     let b: IResponse | null = null;

//     const responsePromise = new Promise<IResponse | null>((resolve) => {
//       this.browserService.setupResponseListener(
//         `https://digitalapi.auspost.com.au/shipments-gateway/v1/watchlist/shipments/${code}`,
//         (data) => {
//           b = data;
//           resolve(b);
//         }
//       );
//     });

//     const test = await this.browserService.getPageContent(
//       `https://auspost.com.au/mypost/track/details/${code}`
//     );

//     await FileManagerService.saveFile("test.html", test.toString());

//     console.log("Resolving...");

//     await responsePromise;

//     console.log("Resolved...");

//     return b;
//   }

//   async getOrderHistoryEvents(code: string): Promise<IHistoryEvent[]> {
//     const postResponse = await this._getParcelHistory(code);

//     if (!postResponse) {
//       return [];
//     }

//     return this._formatResponse(postResponse);
//   }
// }
