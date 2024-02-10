import { Transform } from 'class-transformer';
import { IsOptional, IsBoolean, IsString, IsNumber } from 'class-validator';

export class UpdateAddressDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  id: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsString()
  number: string;

  @IsOptional()
  @IsString()
  street: string;

  @IsOptional()
  @IsString()
  complement: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  zipcode: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsBoolean()
  main: boolean;

  @IsOptional()
  @IsString()
  contactNumber: string;

  @IsOptional()
  @IsString()
  shippingInstructions: string;
}
