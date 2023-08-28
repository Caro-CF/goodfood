import { PrismaClient, Allergen } from '@prisma/client';
import { CreateAllergenDto, UpdateAllergenDto } from '@/dtos/allergens.dto';
import { HttpException } from '@/exceptions/HttpException';

class AllergensService {
  public allergens = new PrismaClient().allergen;

  public getAllergens = async (): Promise<Allergen[]> => {
    try {
      return await this.allergens.findMany();
    } catch (e) {
      throw new Error(e);
    }
  };

  public getAllergenById = async (id: number): Promise<Allergen | null> => {
    const findAllergen: Allergen = await this.allergens.findUnique({ where: { id } });
    if (!findAllergen) throw new HttpException(404, `Allergen with id ${id} not found`);

    return findAllergen;
  };

  public createAllergen = async (data: CreateAllergenDto): Promise<Allergen> => {
    const findExistingAllergen: Allergen = await this.allergens.findUnique({ where: { details: data.details } });
    if (findExistingAllergen) throw new HttpException(409, `Allergen with details "${data.details}" already exists`);

    const createdAllergen: Allergen = await this.allergens.create({ data });

    return createdAllergen;
  };

  public updateAllergen = async (id: number, data: UpdateAllergenDto): Promise<Allergen> => {
    const findExistingAllergen: Allergen = await this.allergens.findUnique({ where: { id } });
    if (!findExistingAllergen) throw new HttpException(404, `Allergen with id ${id} not found`);

    const updatedAllergen: Allergen = await this.allergens.update({ where: { id }, data });

    return updatedAllergen;
  };

  public deleteAllergen = async (id: number): Promise<Allergen> => {
    const findExistingAllergen: Allergen = await this.allergens.findUnique({ where: { id } });
    if (!findExistingAllergen) throw new HttpException(404, `Allergen with id ${id} not found`);

    const deletedAllergen: Allergen = await this.allergens.delete({ where: { id } });

    return deletedAllergen;
  };
}

export default AllergensService;
