import Tracking, { ITracking } from "../models/tracking";
import { BaseRepository } from "./baseRepository";

class TrackingRepository extends BaseRepository<ITracking> {
  constructor() {
    super(Tracking);
  }
}

export default new TrackingRepository();
