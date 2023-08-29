import { NextFunction, Request, Response } from 'express';
import OrdersService from '@/services/orders.service';
import { CreateOrderDto, UpdateOrderDto } from '@/dtos/orders.dto';
import { validate } from 'class-validator';
import { Order } from '@prisma/client';

class OrdersController {
  private ordersService = new OrdersService();

  public createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createOrderDto = new CreateOrderDto();
      createOrderDto.id_user = req.body.id_user;
      createOrderDto.address = req.body.address;
      createOrderDto.city = req.body.city;
      createOrderDto.zip_code = req.body.zip_code;
      createOrderDto.additional_informations = req.body.additional_informations;
      createOrderDto.id_restaurant = req.body.id_restaurant;

      const errors = await validate(createOrderDto);
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

      const createdOrder: Order = await this.ordersService.createOrder(createOrderDto);
      res.status(201).json({ data: createdOrder, message: 'Order created' });
    } catch (error) {
      next(error);
    }
  };

  public updateOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const orderId: number = Number(req.params.id);
      const updateOrderDto: UpdateOrderDto = req.body;

      const errors = await validate(updateOrderDto);
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

      const updatedOrder = await this.ordersService.updateOrder(orderId, updateOrderDto);

      res.status(200).json({ data: updatedOrder, message: 'Order updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default OrdersController;
