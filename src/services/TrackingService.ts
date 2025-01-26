import { CourierService } from "./courierService";
import { TrackingRepository } from "../repositories/trackingRepository";
import { ITrackingCode, ITrackingHistory } from "../interfaces/tracking";
import { invertTrackingCodes } from "../helpers/trackingHelper";
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
    const result = await Promise.all(
      codes.map((code) =>
        this.courierService.fetchHistoryAndProcessChildren(code)
      )
    );
    return invertTrackingCodes(result);
  }

  async saveTracking(fullCode: string, result: any): Promise<void> {
    const existingRecord = await this.trackingRepository.getOne({
      id: fullCode,
    });

    if (existingRecord) {
      await this.trackingRepository.updateOne(
        { id: fullCode },
        { data: result }
      );
    } else {
      await this.trackingRepository.create({
        id: fullCode,
        reference: generateUniqueCode(),
        data: result,
      });
    }
  }
}
