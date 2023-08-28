import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateIngredientDto {
  @IsNotEmpty()
  @IsString()
  public name: string;
}

export class UpdateIngredientDto {
  @IsNotEmpty()
  @IsString()
  public name: string;
}

export class CreateProviderIngredientDto {
  @IsInt()
  public id_provider: number;

  @IsInt()
  public id_ingredient: number;
}
