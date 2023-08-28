import { IsString, IsEmail, IsNotEmpty, MaxLength, IsNumber, IsOptional } from "class-validator";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserDto:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: example@example.com
 *        name:
 *          type: string
 *          default: example
 *        password:
 *          type: string
 *          default: password
 */
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  phone_number: string;
}

export class CreateAdminUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  id_role: number;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstname: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  phone_number: string;
}
export class SignInUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
