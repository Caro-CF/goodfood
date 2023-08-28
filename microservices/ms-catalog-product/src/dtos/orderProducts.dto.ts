import { IsArray, ArrayMinSize, ArrayNotEmpty, IsInt, Min, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateOrderProductsDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  public orderProducts: OrderProductDto[];
}

export class OrderProductDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  public id_order: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  public id_product: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public quantity: number;
}
