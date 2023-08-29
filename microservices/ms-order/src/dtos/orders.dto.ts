import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  public id_user: number;

  @IsNotEmpty()
  @IsString()
  public address: string;

  @IsNotEmpty()
  @IsString()
  public city: string;

  @IsNotEmpty()
  @IsString()
  public zip_code: string;

  @IsOptional()
  @IsString()
  public additional_informations?: string;

  @IsNotEmpty()
  @IsNumber()
  public id_restaurant: number;
}

export class UpdateOrderDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public address?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public city?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public zip_code?: string;

  @IsOptional()
  @IsString()
  public additional_informations?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  public id_delivery?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  public id_status?: number;
}
