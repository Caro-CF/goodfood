import { Ingredient, IngredientAllergen, PrismaClient, ProviderIngredient } from '@prisma/client';
import { CreateIngredientDto, CreateProviderIngredientDto, UpdateIngredientDto } from '@dtos/ingredients.dto'; // Import your DTOs
import { HttpException } from '@exceptions/HttpException';
import { CreateIngredientAllergenDto } from '@dtos/allergens.dto';

class IngredientsService {
  public ingredients = new PrismaClient().ingredient;
  public ingredient = new PrismaClient().ingredient;
  public allergen = new PrismaClient().allergen;
  public ingredientAllergen = new PrismaClient().ingredientAllergen;
  public provider = new PrismaClient().provider;
  public providerIngredient = new PrismaClient().providerIngredient;

  public getIngredients = async (): Promise<Ingredient[]> => {
    try {
      return await this.ingredients.findMany();
    } catch (e) {
      throw new Error(e);
    }
  };

  public getIngredientById = async (id: number): Promise<Ingredient | null> => {
    const findIngredient: Ingredient = await this.ingredients.findUnique({ where: { id: id } });
    if (!findIngredient) throw new HttpException(409, `No ingredient with id ${id}`);

    return findIngredient;
  };

  public async createIngredient(data: CreateIngredientDto): Promise<Ingredient> {
    const findIngredient: Ingredient = await this.ingredients.findUnique({ where: { name: data.name } });
    if (findIngredient) throw new HttpException(409, `This ingredient ${data.name} already exists`);

    const createIngredientData: Promise<Ingredient> = this.ingredients.create({ data });

    return createIngredientData;
  }

  public updateIngredient = async (id: number, data: UpdateIngredientDto): Promise<Ingredient> => {
    const findIngredient: Ingredient = await this.ingredients.findUnique({ where: { id: id } });
    if (!findIngredient) throw new HttpException(409, `No ingredient with id ${id}`);

    const updatedIngredient: Ingredient = await this.ingredients.update({ where: { id: id }, data: data });
    return updatedIngredient;
  };

  public deleteIngredient = async (id: number): Promise<Ingredient> => {
    const findIngredient: Ingredient = await this.ingredients.findUnique({ where: { id: id } });
    if (!findIngredient) throw new HttpException(409, `No ingredient with id ${id}`);

    const deletedIngredient: Ingredient = await this.ingredients.delete({ where: { id: id } });
    return deletedIngredient;
  };

  public createIngredientAllergen = async (data: CreateIngredientAllergenDto): Promise<IngredientAllergen> => {
    const { id_ingredient, id_allergen } = data;

    // Check if Ingredient and Allergen with the provided IDs exist
    const ingredient = await this.ingredient.findUnique({ where: { id: id_ingredient } });
    if (!ingredient) throw new HttpException(404, `Ingredient with id ${id_ingredient} not found`);

    const allergen = await this.allergen.findUnique({ where: { id: id_allergen } });
    if (!allergen) throw new HttpException(404, `Allergen with id ${id_allergen} not found`);

    // Check if the record already exists
    const existingRecord = await this.ingredientAllergen.findFirst({
      where: {
        id_ingredient: id_ingredient,
        id_allergen: id_allergen,
      },
    });

    if (existingRecord)
      throw new HttpException(409, `IngredientAllergen with id_ingredient ${id_ingredient} and id_allergen ${id_allergen} already exists`);

    const createdIngredientAllergen = await this.ingredientAllergen.create({
      data: {
        id_ingredient: id_ingredient,
        id_allergen: id_allergen,
      },
    });

    return createdIngredientAllergen;
  };

  public createProviderIngredient = async (data: CreateProviderIngredientDto): Promise<ProviderIngredient> => {
    const { id_provider, id_ingredient } = data;

    // Check if Provider and Ingredient with the provided IDs exist
    const provider = await this.provider.findUnique({ where: { id: id_provider } });
    if (!provider) {
      throw new HttpException(404, `Provider with id ${id_provider} not found`);
    }

    const ingredient = await this.ingredient.findUnique({ where: { id: id_ingredient } });
    if (!ingredient) {
      throw new HttpException(404, `Ingredient with id ${id_ingredient} not found`);
    }

    // Check if the record already exists
    const existingRecord = await this.providerIngredient.findFirst({
      where: {
        id_provider: id_provider,
        id_ingredient: id_ingredient,
      },
    });

    if (existingRecord) {
      throw new HttpException(409, `ProviderIngredient with id_provider ${id_provider} and id_ingredient ${id_ingredient} already exists`);
    }

    const createdProviderIngredient = await this.providerIngredient.create({
      data: {
        id_provider: id_provider,
        id_ingredient: id_ingredient,
      },
    });

    return createdProviderIngredient;
  };

  public getIngredientAllergensByIngredientId = async (id: number): Promise<IngredientAllergen[]> => {
    const ingredient = await this.ingredient.findUnique({ where: { id: id } });
    if (!ingredient) throw new HttpException(404, `Ingredient with id ${id} not found`);

    const ingredientAllergens = await this.ingredientAllergen.findMany({
      where: {
        id_ingredient: id,
      },
      include: {
        allergen: true, // Include the allergen details
      },
    });

    return ingredientAllergens;
  };
}

export default IngredientsService;
