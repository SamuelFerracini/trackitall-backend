import OrderRepository from "../repositories/orderRepository";
import { IOrder } from "../models/order";

class OrderService {
  async create({ code, courier }: Partial<IOrder>): Promise<IOrder> {
    return await OrderRepository.create({
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
    const found = await OrderRepository.getOne({ code, courier });

    if (found) {
      return found;
    }

    return await OrderRepository.create({
      code,
      courier,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
}

export default new OrderService();
