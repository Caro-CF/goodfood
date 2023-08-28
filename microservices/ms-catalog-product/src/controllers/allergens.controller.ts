import { NextFunction, Request, Response } from 'express';
import AllergensService from '@/services/allergens.service';
import { Allergen } from '@prisma/client';
import { CreateAllergenDto, UpdateAllergenDto } from '@/dtos/allergens.dto';
import { validate } from 'class-validator';

class AllergensController {
  public allergensService = new AllergensService();

  public getAllergens = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allergens: Allergen[] = await this.allergensService.getAllergens();
      res.status(200).json({ allergens });
    } catch (error) {
      next(error);
    }
  };

  public getAllergenById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const allergen: Allergen | null = await this.allergensService.getAllergenById(id);
      res.status(200).json({ allergen });
    } catch (error) {
      next(error);
    }
  };

  public createAllergen = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createAllergenDto = new CreateAllergenDto();
      createAllergenDto.details = req.body.details;

      const errors = await validate(createAllergenDto);
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

      const allergenData: CreateAllergenDto = req.body;
      const createdAllergen: Allergen = await this.allergensService.createAllergen(allergenData);

      res.status(201).json({ data: createdAllergen, message: 'Allergen created' });
    } catch (error) {
      next(error);
    }
  };

  public updateAllergen = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const updateAllergenDto = new UpdateAllergenDto();
      updateAllergenDto.details = req.body.details;

      const errors = await validate(updateAllergenDto);
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

      const updatedAllergen = await this.allergensService.updateAllergen(id, updateAllergenDto);

      res.status(200).json({ data: updatedAllergen, message: 'Allergen updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAllergen = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const deletedAllergen: Allergen = await this.allergensService.deleteAllergen(id);

      res.status(204).json({ data: deletedAllergen, message: 'Allergen deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default AllergensController;
