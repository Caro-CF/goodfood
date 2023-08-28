import { NextFunction, Request, Response } from 'express';
import ProductsService from '@/services/products.service'; // Import your ProductsService
import { Product, ProductIngredient } from '@prisma/client';
import { CreateProductDto, CreateProductIngredientDto, UpdateProductDto } from '@/dtos/products.dto'; // Import your DTOs
import { validate } from 'class-validator';

class ProductsController {
  public productsService = new ProductsService(); // Instantiate your ProductsService

  public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const products: Product[] = await this.productsService.getProducts();
      res.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const product: Product | null = await this.productsService.getProductById(id);
      res.status(200).json({ product });
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createProductDto = new CreateProductDto();
      createProductDto.name = req.body.name;

      const errors = await validate(createProductDto);
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

      const productData: CreateProductDto = req.body;
      const createdProduct: Product = await this.productsService.createProduct(productData);

      res.status(201).json({ data: createdProduct, message: 'Product created' });
    } catch (error) {
      next(error);
    }
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const updateProductDto = new UpdateProductDto();
      updateProductDto.name = req.body.name;

      const errors = await validate(updateProductDto);
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

      const updatedProduct = await this.productsService.updateProduct(id, updateProductDto);

      res.status(200).json({ data: updatedProduct, message: 'Product updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const deletedProduct: Product = await this.productsService.deleteProduct(id);

      res.status(204).json({ data: deletedProduct, message: 'Product deleted' });
    } catch (error) {
      next(error);
    }
  };

  public createProductIngredient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createProductIngredientDto = new CreateProductIngredientDto();
      createProductIngredientDto.id_product = Number(req.params.id);
      createProductIngredientDto.id_ingredient = req.body.id_ingredient;

      const errors = await validate(createProductIngredientDto);
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

      const createdProductIngredient: ProductIngredient = await this.productsService.createProductIngredient(createProductIngredientDto);

      res.status(201).json({ data: createdProductIngredient, message: 'Product ingredient created' });
    } catch (error) {
      next(error);
    }
  };

  public getProductIngredientsByProductId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id); // Get the product ID from the URL

      const productIngredients = await this.productsService.getProductIngredientsByProductId(id);

      res.status(200).json({ data: productIngredients });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductsController;
