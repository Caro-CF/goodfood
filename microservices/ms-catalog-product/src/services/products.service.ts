import { Ingredient, PrismaClient, Product, ProductIngredient } from '@prisma/client';
import { CreateProductDto, CreateProductIngredientDto, UpdateProductDto } from '@/dtos/products.dto';
import { HttpException } from '@/exceptions/HttpException';

class ProductsService {
  public products = new PrismaClient().product;
  public ingredients = new PrismaClient().ingredient;
  public productIngredient = new PrismaClient().productIngredient;
  public getProducts = async (): Promise<Product[]> => {
    try {
      return await this.products.findMany();
    } catch (e) {
      throw new Error(e);
    }
  };

  public getProductById = async (id: number): Promise<Product | null> => {
    const findExistingProduct: Product = await this.products.findUnique({ where: { id } });
    if (!findExistingProduct) throw new HttpException(404, `Product with id ${id} not found`);

    return findExistingProduct;
  };

  public createProduct = async (data: CreateProductDto): Promise<Product> => {
    const findExistingProduct: Product = await this.products.findUnique({ where: { name: data.name } });
    if (findExistingProduct) throw new HttpException(409, `Product with name "${data.name}" already exists`);

    const createdProduct: Product = await this.products.create({ data });

    return createdProduct;
  };

  public updateProduct = async (id: number, data: UpdateProductDto): Promise<Product> => {
    const findExistingProduct: Product = await this.products.findUnique({ where: { id } });
    if (!findExistingProduct) throw new HttpException(404, `Product with id ${id} not found`);

    const updateData: Record<string, any> = {};
    if (data.name && data.name !== findExistingProduct.name) updateData.name = data.name;

    // Check if updateData is not empty
    if (Object.keys(updateData).length === 0) {
      throw new HttpException(400, 'No fields to update');
    }

    const updatedProduct: Product = await this.products.update({ where: { id }, data: updateData });

    return updatedProduct;
  };

  public deleteProduct = async (id: number): Promise<Product> => {
    const findExistingProduct: Product = await this.products.findUnique({ where: { id } });
    if (!findExistingProduct) throw new HttpException(404, `Product with id ${id} not found`);

    const deletedProduct: Product = await this.products.delete({ where: { id } });

    return deletedProduct;
  };

  public createProductIngredient = async (data: CreateProductIngredientDto): Promise<ProductIngredient> => {
    try {
      const id: number = data.id_product;
      const findExistingProduct: Product = await this.products.findUnique({ where: { id } });
      if (!findExistingProduct) throw new HttpException(404, `Product with id ${id} not found`);

      const findExistingIngredient: Ingredient = await this.ingredients.findUnique({ where: { id: data.id_ingredient } });
      if (!findExistingIngredient) throw new HttpException(404, `Ingredient with id ${data.id_ingredient} not found`);

      const existingProductIngredient: ProductIngredient | null = await this.productIngredient.findFirst({
        where: {
          id_product: data.id_product,
          id_ingredient: data.id_ingredient,
        },
      });
      if (existingProductIngredient) {
        throw new HttpException(409, `ProductIngredient with id_product ${data.id_product} and id_ingredient ${data.id_ingredient} already exists`);
      }

      const createdProductIngredient: ProductIngredient = await this.productIngredient.create({ data });
      return createdProductIngredient;
    } catch (e) {
      throw new Error(e);
    }
  };

  public getProductIngredientsByProductId = async (id: number): Promise<ProductIngredient[]> => {
    const findExistingProduct: Product = await this.products.findUnique({ where: { id } });
    if (!findExistingProduct) throw new HttpException(404, `Product with id ${id} not found`);

    const productIngredients = await this.productIngredient.findMany({
      where: {
        id_product: id,
      },
      include: {
        ingredient: true,
      },
    });

    return productIngredients;
  };
}

export default ProductsService;
