import { PrismaClient, Provider, ProviderIngredient } from '@prisma/client';
import { CreateProviderDto, UpdateProviderDto } from '@/dtos/providers.dto';
import { HttpException } from '@/exceptions/HttpException';

class ProvidersService {
  private readonly providers = new PrismaClient().provider;
  private readonly providerIngredient = new PrismaClient().providerIngredient;
  public getProviders = async (): Promise<Provider[]> => {
    try {
      return await this.providers.findMany();
    } catch (e) {
      throw new Error(e);
    }
  };

  public getProviderById = async (id: number): Promise<Provider | null> => {
    const findExistingProvider: Provider = await this.providers.findUnique({ where: { id } });
    if (!findExistingProvider) throw new HttpException(404, `Provider with id ${id} not found`);

    return findExistingProvider;
  };

  public createProvider = async (data: CreateProviderDto): Promise<Provider> => {
    const findExistingProvider: Provider = await this.providers.findUnique({ where: { name: data.name } });
    if (findExistingProvider) throw new HttpException(409, `Provider with name "${data.name}" already exists`);

    const createdProvider: Provider = await this.providers.create({ data });

    return createdProvider;
  };

  public updateProvider = async (id: number, data: UpdateProviderDto): Promise<Provider> => {
    const findExistingProvider: Provider = await this.providers.findUnique({ where: { id } });
    if (!findExistingProvider) throw new HttpException(404, `Provider with id ${id} not found`);

    const updateData: Record<string, any> = {};
    if (data.name && data.name !== findExistingProvider.name) updateData.name = data.name;
    if (data.line_1 && data.line_1 !== findExistingProvider.line_1) updateData.line_1 = data.line_1;
    if (data.city && data.city !== findExistingProvider.city) updateData.city = data.city;
    if (data.postal_code && data.postal_code !== findExistingProvider.postal_code) updateData.postal_code = data.postal_code;
    if (data.country && data.country !== findExistingProvider.country) updateData.country = data.country;
    if (data.additional_details && data.additional_details !== findExistingProvider.additional_details)
      updateData.additional_details = data.additional_details;

    // Check if updateData is not empty
    if (Object.keys(updateData).length === 0) {
      throw new HttpException(400, 'No fields to update');
    }

    const updatedProvider: Provider = await this.providers.update({ where: { id }, data: updateData });

    return updatedProvider;
  };

  public deleteProvider = async (id: number): Promise<Provider> => {
    const findExistingProvider: Provider = await this.providers.findUnique({ where: { id } });
    if (!findExistingProvider) throw new HttpException(404, `Provider with id ${id} not found`);

    const deletedProvider: Provider = await this.providers.delete({ where: { id } });

    return deletedProvider;
  };

  public getProviderIngredientsByProviderId = async (id: number): Promise<ProviderIngredient[]> => {
    const findExistingProvider: Provider = await this.providers.findUnique({ where: { id: id } });
    if (!findExistingProvider) throw new HttpException(404, `Provider with id ${id} not found`);

    const providerIngredients = await this.providerIngredient.findMany({
      where: {
        id_provider: id,
      },
      include: {
        ingredient: true,
      },
    });

    return providerIngredients;
  };
}

export default ProvidersService;
