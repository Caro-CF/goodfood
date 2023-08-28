import { Router } from 'express';
import ProductsController from '@controllers/products.controller'; // Import your ProductsController

const productsRouter = Router();
const productsController = new ProductsController();

/**
 * @openapi
 * tags:
 *  name: Products
 *  description: Product routes
 */

/**
 * @swagger
 * /products:
 *  get:
 *    summary: Get all products
 *    tags: [Products]
 *    responses:
 *    200:
 *      description: OK
 */
productsRouter.get('/', productsController.getProducts);

/**
 * @swagger
 * /products/:id:
 *  get:
 *    summary: Get product by ID
 *    tags: [Products]
 *    parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *    200:
 *      description: OK
 */
productsRouter.get('/:id', productsController.getProductById);

/**
 * @swagger
 * /products:
 *  post:
 *    summary: Create product
 *    tags: [Products]
 *    responses:
 *    201:
 *      description: Created
 */
productsRouter.post('/', productsController.createProduct);

/**
 * @swagger
 * /products/:id:
 *  put:
 *    summary: Update product by ID
 *    tags: [Products]
 *    parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *    200:
 *      description: OK
 */
productsRouter.put('/:id', productsController.updateProduct);

/**
 * @swagger
 * /products/:id:
 *  delete:
 *    summary: Delete product by ID
 *    tags: [Products]
 *    parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *    204:
 *      description: No Content
 */
productsRouter.delete('/:id', productsController.deleteProduct);

/**
 * @swagger
 * /products/ingredients:
 *  post:
 *    summary: Create product-ingredient relationship
 *    tags: [Products]
 *    responses:
 *    201:
 *      description: Created
 */
productsRouter.post('/:id/ingredients', productsController.createProductIngredient);

productsRouter.get('/:id/ingredients', productsController.getProductIngredientsByProductId);
export default productsRouter;
