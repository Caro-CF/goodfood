import { NextFunction, Request, Response } from 'express';
import OrdersService from '@/services/orders.service';
import { CreateOrderProductsDto } from '@dtos/orderProducts.dto';
import { validate } from 'class-validator';

class OrdersController {
  private readonly ordersService = new OrdersService();

  public createOrderProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createOrderProductsDto = new CreateOrderProductsDto();
      createOrderProductsDto.orderProducts = req.body.orderProducts;
      
      const errors = await validate(createOrderProductsDto);
      if (errors.length > 0) {
        const constraints = {};
        errors.forEach(error => {
          const propertyName = error.property;
          const errorConstraints = Object.values(error.constraints);
          constraints[propertyName] = errorConstraints;
        });
        res.status(400).json({ constraints });
        return;
      }

      const createdOrderProducts = await this.ordersService.createOrderProducts(createOrderProductsDto.orderProducts);

      res.status(201).json({ data: createdOrderProducts, message: 'Order products created' });
    } catch (error) {
      next(error);
    }
  };
}

export default OrdersController;
