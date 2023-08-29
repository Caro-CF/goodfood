import { PrismaClient, Order } from '@prisma/client';
import { CreateOrderDto, UpdateOrderDto } from '@/dtos/orders.dto';
import { HttpException } from "@exceptions/HttpException";

class OrdersService {
  private prisma = new PrismaClient();

  public async createOrder(data: CreateOrderDto): Promise<Order> {
    return this.prisma.order.create({ data: data as any});
  }

  public async updateOrder(id: number, data: UpdateOrderDto): Promise<Order> {
    try {
      const existingOrder = await this.prisma.order.findUnique({ where: { id } });
      if (!existingOrder) {
        throw new HttpException(404, `Order with id ${id} not found`);
      }

      const updatedOrder = await this.prisma.order.update({
        where: { id },
        data,
      });

      return updatedOrder;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default OrdersService;
