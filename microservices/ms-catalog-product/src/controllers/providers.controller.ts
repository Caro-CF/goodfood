import { NextFunction, Request, Response } from 'express';
import ProvidersService from '@/services/providers.service'; // Import your ProvidersService
import { Provider } from '@prisma/client';
import { CreateProviderDto, UpdateProviderDto } from '@/dtos/providers.dto'; // Import your DTOs
import { validate } from 'class-validator';

class ProvidersController {
  public providersService = new ProvidersService(); // Instantiate your ProvidersService

  public getProviders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const providers: Provider[] = await this.providersService.getProviders();
      res.status(200).json({ providers });
    } catch (error) {
      next(error);
    }
  };

  public getProviderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const provider: Provider | null = await this.providersService.getProviderById(id);
      res.status(200).json({ provider });
    } catch (error) {
      next(error);
    }
  };

  public createProvider = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createProviderDto = new CreateProviderDto();
      createProviderDto.name = req.body.name;
      createProviderDto.line_1 = req.body.line_1;
      createProviderDto.city = req.body.city;
      createProviderDto.postal_code = req.body.postal_code;
      createProviderDto.country = req.body.country;
      createProviderDto.additional_details = req.body.additional_details;

      const errors = await validate(createProviderDto);
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

      const providerData: CreateProviderDto = req.body;
      const createdProvider: Provider = await this.providersService.createProvider(providerData);

      res.status(201).json({ data: createdProvider, message: 'Provider created' });
    } catch (error) {
      next(error);
    }
  };

  public updateProvider = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const updateProviderDto = new UpdateProviderDto();
      updateProviderDto.name = req.body.name;
      updateProviderDto.line_1 = req.body.line_1;
      updateProviderDto.city = req.body.city;
      updateProviderDto.postal_code = req.body.postal_code;
      updateProviderDto.country = req.body.country;
      updateProviderDto.additional_details = req.body.additional_details;

      const errors = await validate(updateProviderDto);
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

      const updatedProvider = await this.providersService.updateProvider(id, updateProviderDto);

      res.status(200).json({ data: updatedProvider, message: 'Provider updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProvider = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const deletedProvider: Provider = await this.providersService.deleteProvider(id);

      res.status(204).json({ data: deletedProvider, message: 'Provider deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getProviderIngredientsByProviderId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id); // Get the provider ID from the URL

      const providerIngredients = await this.providersService.getProviderIngredientsByProviderId(id);

      res.status(200).json({ data: providerIngredients });
    } catch (error) {
      next(error);
    }
  };
}

export default ProvidersController;
