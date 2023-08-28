import { Router } from 'express';
import AllergensController from '@controllers/allergens.controller';

const allergensRouter = Router();
const allergensController = new AllergensController();

// Define your routes and corresponding middleware
allergensRouter.get('/', allergensController.getAllergens);
allergensRouter.get('/:id', allergensController.getAllergenById);
allergensRouter.post('/', allergensController.createAllergen);
allergensRouter.put('/:id', allergensController.updateAllergen);
allergensRouter.delete('/:id', allergensController.deleteAllergen);

export default allergensRouter;
