import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProviderDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public line_1: string;

  @IsNotEmpty()
  @IsString()
  public city: string;

  @IsNotEmpty()
  @IsString()
  public postal_code: string;

  @IsNotEmpty()
  @IsString()
  public country: string;

  @IsOptional()
  @IsString()
  public additional_details?: string;
}

export class UpdateProviderDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public line_1: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public city: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(6)
  public postal_code: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public country: string;

  @IsOptional()
  @IsString()
  public additional_details?: string;
}
