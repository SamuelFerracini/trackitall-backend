import TrackingRepository from "../repositories/trackingRepository";
import { ITracking } from "../models/tracking";
import { FilterQuery } from "mongoose";
import { generateUniqueCode } from "../helpers/helper";

export class TrackingService {
  async create(orders: string[]): Promise<ITracking | undefined> {
    const found = await TrackingRepository.getOne({ orders });
    if (found) return found;

    let tries = 0;

    while (tries < 3) {
      const reference = generateUniqueCode();

      const codeDuplicated = await TrackingRepository.getOne({
        reference,
      });

      if (!codeDuplicated) {
        return TrackingRepository.create({ reference, orders });
      }

      tries++;
    }

    throw new Error("Cannot create unique id");
  }

  async getOne(filter: FilterQuery<ITracking>): Promise<ITracking | null> {
    return await TrackingRepository.getOne(filter, {
      populate: ["orders"],
    });
  }

  async getMany(filter: FilterQuery<ITracking> = {}): Promise<ITracking[]> {
    return await TrackingRepository.getMany(filter, undefined, undefined, {
      populate: ["orders"],
    });
  }
}
