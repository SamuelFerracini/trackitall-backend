import { OrderRepository } from "../repositories/orderRepository";
import { IOrder } from "../models/order";

export default class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async create({ code, courier }: Partial<IOrder>): Promise<IOrder> {
    return await this.orderRepository.create({
      code,
      courier,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  async batchCreate(orders: IOrder[], savedOrders: IOrder[] = []) {
    await Promise.all(
      orders.map(async (order: any) => {
        const created = await this.firstOrCreate({
          code: order.code,
          courier: order.courier,
        });

        savedOrders.push(created);

        if (order.children) {
          await this.batchCreate(order.children, savedOrders);
        }
      })
    );

    return savedOrders;
  }

  async firstOrCreate({ code, courier }: Partial<IOrder>): Promise<IOrder> {
    const found = await this.orderRepository.getOne({ code, courier });

    if (found) {
      return found;
    }

    return await this.orderRepository.create({
      code,
      courier,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
}
