import Tracking, { ITracking } from "../models/tracking";
import { BaseRepository } from "./baseRepository";

export class TrackingRepository extends BaseRepository<ITracking> {
  constructor() {
    super(Tracking);
  }
}
