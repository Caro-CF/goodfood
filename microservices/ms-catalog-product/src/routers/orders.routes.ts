import { Router } from 'express';
import OrdersController from '@controllers/orders.controller';

const ordersRouter = Router();
const ordersController = new OrdersController();

/**
 * @swagger
 * /orders/products:
 *  post:
 *    summary: Create order products
 *    tags: [Orders]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateOrderProductsDto'
 *    responses:
 *      201:
 *        description: Created
 */
ordersRouter.post('/products', ordersController.createOrderProducts);

export default ordersRouter;
