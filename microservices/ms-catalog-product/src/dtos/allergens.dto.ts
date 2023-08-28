import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAllergenDto {
  @IsNotEmpty()
  @IsString()
  public details: string;
}

export class UpdateAllergenDto {
  @IsNotEmpty()
  @IsString()
  public details: string;
}

export class CreateIngredientAllergenDto {
  @IsInt()
  public id_ingredient: number;

  @IsInt()
  public id_allergen: number;
}
