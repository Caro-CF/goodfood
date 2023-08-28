import { Router } from 'express';
import IngredientsController from '@controllers/ingredients.controller'; // Import your IngredientsController

const ingredientsRouter = Router();
const ingredientsController = new IngredientsController();

/**
 * @openapi
 * tags:
 *  name: Ingredients
 *  description: Ingredient routes
 */
/**
 * @swagger
 * /ingredients:
 *  get:
 *    summary: Get all ingredients
 *    tags: [Ingredients]
 *    responses:
 *    200:
 *      description: OK
 */
ingredientsRouter.get('/', ingredientsController.getIngredients);

/**
 * @swagger
 * /ingredients/:id:
 *  get:
 *    summary: Get ingredient by ID
 *    tags: [Ingredients]
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
ingredientsRouter.get('/:id', ingredientsController.getIngredientById);

/**
 * @swagger
 * /ingredients:
 *  post:
 *    summary: Create ingredient
 *    tags: [Ingredients]
 *    responses:
 *    201:
 *      description: Created
 */
ingredientsRouter.post('/', ingredientsController.createIngredient);

/**
 * @swagger
 * /ingredients/:id:
 *  put:
 *    summary: Update ingredient by ID
 *    tags: [Ingredients]
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
ingredientsRouter.put('/:id', ingredientsController.updateIngredient);

/**
 * @swagger
 * /ingredients/:id:
 *  delete:
 *    summary: Delete ingredient by ID
 *    tags: [Ingredients]
 *    parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      schema:
 *        type: integer
 */
ingredientsRouter.delete('/:id', ingredientsController.deleteIngredient);

ingredientsRouter.get('/:id/allergens', ingredientsController.getIngredientAllergensByIngredientId);

ingredientsRouter.post('/:id/allergens', ingredientsController.createIngredientAllergen);

ingredientsRouter.post('/:id/providers', ingredientsController.createProviderIngredient);
export default ingredientsRouter;
