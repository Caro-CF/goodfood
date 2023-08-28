import { NextFunction, Request, Response } from 'express';
import IngredientsService from '@/services/ingredients.service'; // Import your IngredientsService
import { Ingredient } from '@prisma/client';
import { CreateIngredientDto, CreateProviderIngredientDto, UpdateIngredientDto } from '@/dtos/ingredients.dto'; // Import your DTOs
import { validate } from 'class-validator';
import { CreateIngredientAllergenDto } from '@dtos/allergens.dto';

class IngredientsController {
  private readonly ingredientsService = new IngredientsService(); // Instantiate your IngredientsService
  private readonly ingredientAllergensService = new IngredientsService(); // Instantiate your IngredientsService
  private readonly providerIngredientsService = new IngredientsService(); // Instantiate your IngredientsService

  public getIngredients = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ingredients: Ingredient[] = await this.ingredientsService.getIngredients();
      res.status(200).json({ ingredients });
    } catch (error) {
      next(error);
    }
  };

  public getIngredientById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const ingredient: Ingredient | null = await this.ingredientsService.getIngredientById(id);
      res.status(200).json({ ingredient });
    } catch (error) {
      next(error);
    }
  };

  public createIngredient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createIngredientDto = new CreateIngredientDto();
      createIngredientDto.name = req.body.name;

      const errors = await validate(createIngredientDto);
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

      const ingredientData: CreateIngredientDto = req.body;
      const createdIngredient: Ingredient = await this.ingredientsService.createIngredient(ingredientData);

      res.status(201).json({ data: createdIngredient, message: 'Ingredient created' });
    } catch (error) {
      next(error);
    }
  };

  public updateIngredient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const updateIngredientDto = new UpdateIngredientDto();
      updateIngredientDto.name = req.body.name;

      const errors = await validate(updateIngredientDto);
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

      const updatedIngredient = await this.ingredientsService.updateIngredient(id, updateIngredientDto);

      res.status(200).json({ data: updatedIngredient, message: 'Ingredient updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteIngredient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const deletedIngredient: Ingredient = await this.ingredientsService.deleteIngredient(id);

      res.status(204).json({ data: deletedIngredient, message: 'Ingredient deleted' });
    } catch (error) {
      next(error);
    }
  };

  public createIngredientAllergen = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createIngredientAllergenDto = new CreateIngredientAllergenDto();
      createIngredientAllergenDto.id_ingredient = Number(req.params.id);
      createIngredientAllergenDto.id_allergen = req.body.id_allergen;

      const errors = await validate(createIngredientAllergenDto);
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

      const createdIngredientAllergen = await this.ingredientAllergensService.createIngredientAllergen(createIngredientAllergenDto);

      res.status(201).json({ data: createdIngredientAllergen, message: 'IngredientAllergen created' });
    } catch (error) {
      next(error);
    }
  };

  public createProviderIngredient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createProviderIngredientDto = new CreateProviderIngredientDto();
      createProviderIngredientDto.id_provider = req.body.id_provider;
      createProviderIngredientDto.id_ingredient = Number(req.params.id);

      const errors = await validate(createProviderIngredientDto);
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

      const createdProviderIngredient = await this.providerIngredientsService.createProviderIngredient(createProviderIngredientDto);

      res.status(201).json({ data: createdProviderIngredient, message: 'ProviderIngredient created' });
    } catch (error) {
      next(error);
    }
  };

  public getIngredientAllergensByIngredientId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id); // Get the ingredient ID from the URL

      const ingredientAllergens = await this.ingredientsService.getIngredientAllergensByIngredientId(id);

      res.status(200).json({ data: ingredientAllergens });
    } catch (error) {
      next(error);
    }
  };
}

export default IngredientsController;
