import { Request, Response } from "express";
import TrackingService from "../services/trackingService";
import OrderService from "../services/orderService";
import BaseController from "./baseController";

class TrackingsController extends BaseController {
  private trackingService: TrackingService;
  private orderService: OrderService;

  constructor() {
    super();

    this.trackingService = new TrackingService();
    this.orderService = new OrderService();
  }

  async getTracking(req: Request, res: Response): Promise<void> {
    const { reference } = req.params;

    const tracking = await this.trackingService.getOne({ reference });

    this.jsonResponse(res, tracking);
  }

  async getTrackings(_: Request, res: Response): Promise<void> {
    const trackings = await this.trackingService.getMany();

    this.jsonResponse(res, trackings);
  }

  async createTracking(req: Request, res: Response): Promise<void> {
    const { orders } = req.body;

    const savedOrders = await this.orderService.batchCreate(orders);

    const orderIds = savedOrders.map((o) => o._id as string);

    const tracking = await this.trackingService.create(orderIds);

    if (!tracking) {
      // TODO - Improve
      this.jsonResponse(res, { error: true }, 500);
      return;
    }

    this.jsonResponse(res, { trackingReference: tracking?.reference });
  }

  async updateTracking(req: Request, res: Response): Promise<void> {
    const { reference } = req.params;

    if (!reference) {
      throw new Error("Reference is required");
    }

    // TODO - Dispatch job to update tracking

    this.jsonResponse(res, {});
  }
}

export default new TrackingsController();
