import { Router } from 'express';
import ProvidersController from '@controllers/providers.controller'; // Import your ProvidersController

const providersRouter = Router();
const providersController = new ProvidersController();

/**
 * @openapi
 * tags:
 *  name: Providers
 *  description: Provider routes
 */

/**
 * @swagger
 * /providers:
 *  get:
 *    summary: Get all providers
 *    tags: [Providers]
 *    responses:
 *    200:
 *      description: OK
 */
providersRouter.get('/', providersController.getProviders);

/**
 * @swagger
 * /providers/:id:
 *  get:
 *    summary: Get provider by ID
 *    tags: [Providers]
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
providersRouter.get('/:id', providersController.getProviderById);

/**
 * @swagger
 * /providers:
 *  post:
 *    summary: Create provider
 *    tags: [Providers]
 *    responses:
 *    201:
 *      description: Created
 */
providersRouter.post('/', providersController.createProvider);

/**
 * @swagger
 * /providers/:id:
 *  put:
 *    summary: Update provider by ID
 *    tags: [Providers]
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
providersRouter.put('/:id', providersController.updateProvider);

/**
 * @swagger
 * /providers/:id:
 *  delete:
 *    summary: Delete provider by ID
 *    tags: [Providers]
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
providersRouter.delete('/:id', providersController.deleteProvider);

providersRouter.get('/:id/ingredients', providersController.getProviderIngredientsByProviderId);
export default providersRouter;
