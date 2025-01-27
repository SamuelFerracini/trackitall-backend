import { Request, Response } from "express";
import { TrackingService } from "../services/trackingService";
import BaseController from "./baseController";
import PublicTrackingTransformer from "../transformers/publicTrackingTransformer";

class PublicTrackingsController extends BaseController {
  private trackingService: TrackingService;

  constructor() {
    super();
    this.trackingService = new TrackingService();
  }

  async getTracking(req: Request, res: Response): Promise<void> {
    const { reference } = req.params;

    const tracking = await this.trackingService.getOne({ reference });

    if (!tracking) {
      this.notFound(res);
      return;
    }

    this.jsonResponse(res, PublicTrackingTransformer.transform(tracking));
  }
}

export default new PublicTrackingsController();
