import { Router } from 'express';
import OrdersController from '@/controllers/orders.controller';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.post('/', ordersController.createOrder);
ordersRouter.put('/:id', ordersController.updateOrder);

export default ordersRouter;
