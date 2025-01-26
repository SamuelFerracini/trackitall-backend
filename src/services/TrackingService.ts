import CourierService from "./courierService";
import { TrackingRepository } from "../repositories/trackingRepository";
import { ITrackingCode, ITrackingHistory } from "../interfaces/tracking";
import { ITracking } from "../models/tracking";
import { FilterQuery } from "mongoose";
import { generateUniqueCode } from "../helpers/helper";

export default class TrackingService {
  private trackingRepository: TrackingRepository;
  private courierService: CourierService;

  constructor() {
    this.trackingRepository = new TrackingRepository();
    this.courierService = new CourierService();
  }

  async processTrackingCodes(
    codes: ITrackingCode[]
  ): Promise<ITrackingHistory[]> {
    return [];
    // const result = await Promise.all(
    //   codes.map((code) =>
    //     this.courierService.fetchHistoryAndProcessChildren(code)
    //   )
    // );
    // return invertTrackingCodes(result);
  }

  async create(orderIds: string[]): Promise<ITracking | undefined> {
    const found = await this.trackingRepository.getOne({ orderIds });
    if (found) return found;

    let tries = 0;

    while (tries < 3) {
      const reference = generateUniqueCode();

      const codeDuplicated = await this.trackingRepository.getOne({
        reference,
      });

      if (!codeDuplicated) {
        return this.trackingRepository.create({ reference, orderIds });
      }

      tries++;
    }

    throw new Error("Cannot create unique id");
  }

  async getOne(filter: FilterQuery<ITracking>): Promise<ITracking | null> {
    return await this.trackingRepository.getOne(filter);
  }

  async getMany(filter: FilterQuery<ITracking> = {}): Promise<ITracking[]> {
    return await this.trackingRepository.getMany(filter);
  }
}
