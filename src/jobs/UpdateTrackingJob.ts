import { ITracking } from "../models/tracking";
import CourierService from "../services/courierService";

export class UpdateTrackingJob {
  private tracking: ITracking;
  private courierService: CourierService;

  constructor(tracking: ITracking) {
    this.tracking = tracking;
    this.courierService = new CourierService();
  }

  execute() {
    this.courierService.fetchHistoryAndProcessChildren(this.tracking);
  }
}
