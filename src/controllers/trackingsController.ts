import { Request, Response } from "express";
import TrackingService from "../services/trackingService";
import OrderService from "../services/orderService";
import BaseController from "./baseController";
import TrackingTransformer from "../transformers/trackingTransformer";
import FetchTrackingOrderHistoryJob from "../jobs/fetchTrackingOrderHistoryJob";
import { IOrder } from "../models/order";

class TrackingsController extends BaseController {
  async getTracking(req: Request, res: Response): Promise<void> {
    const { reference } = req.params;

    const tracking = await TrackingService.getOne({ reference });

    if (!tracking) {
      this.notFound(res);
      return;
      ``;
    }

    this.jsonResponse(res, TrackingTransformer.transform(tracking));
  }

  async getTrackings(_: Request, res: Response): Promise<void> {
    const trackings = await TrackingService.getMany();

    this.jsonResponse(res, TrackingTransformer.transformCollection(trackings));
  }

  async createTracking(req: Request, res: Response): Promise<void> {
    const { orders } = req.body;

    const savedOrders = await OrderService.batchCreate(orders);

    const orderIds = savedOrders.map((o) => o._id as string);

    const tracking = await TrackingService.create(orderIds);

    if (!tracking) {
      // TODO - Improve
      this.jsonResponse(res, { error: true }, 500);
      return;
    }

    const trackingWithOrders = await tracking.populate("orders");

    this.jsonResponse(res, TrackingTransformer.transform(trackingWithOrders));
  }

  async updateTracking(req: Request, res: Response): Promise<void> {
    const { reference } = req.params;

    if (!reference) {
      throw new Error("Reference is required.");
    }

    const tracking = await TrackingService.getOne({ reference });

    if (!tracking) {
      throw new Error("Tracking not found.");
    }

    await FetchTrackingOrderHistoryJob.execute(tracking.orders as IOrder[]);

    const updated = await TrackingService.getOne({ reference });

    if (!updated) {
      throw new Error("Tracking not found.");
    }

    this.jsonResponse(res, TrackingTransformer.transform(updated));
  }
}

export default new TrackingsController();
