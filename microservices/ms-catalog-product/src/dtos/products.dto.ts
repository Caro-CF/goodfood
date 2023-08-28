import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  public name: string;
}

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  public name: string;
}

export class CreateProductIngredientDto {
  @IsNotEmpty()
  @IsInt()
  public id_product: number;

  @IsNotEmpty()
  @IsInt()
  public id_ingredient: number;
}
