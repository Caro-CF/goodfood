import { OrderProduct, PrismaClient } from '@prisma/client';

class OrdersService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public createOrderProducts = async (orderProductsData: { id_order: number; id_product: number; quantity: number }[]): Promise<OrderProduct[]> => {
    const orderProducts = await this.prisma.orderProduct.findMany({
      where: {
        id_order: {
          in: orderProductsData.map(orderProduct => orderProduct.id_order),
        },
        id_product: {
          in: orderProductsData.map(orderProduct => orderProduct.id_product),
        },
      },
    });

    if (orderProducts.length > 0) {
      const orderProductsIds = orderProducts.map(orderProduct => `${orderProduct.id_order}-${orderProduct.id_product}`);
      const orderProductsDataIds = orderProductsData.map(orderProduct => `${orderProduct.id_order}-${orderProduct.id_product}`);
      const duplicatedOrderProductsIds = orderProductsIds.filter(orderProductId => orderProductsDataIds.includes(orderProductId));
      if (duplicatedOrderProductsIds.length > 0) {
        throw new Error(`Order products with ids ${duplicatedOrderProductsIds.join(', ')} already exist`);
      }
    }

    const createdOrderProducts = await this.prisma.orderProduct.createMany({
      data: orderProductsData,
    });

    return createdOrderProducts;
  };
}

export default OrdersService;
