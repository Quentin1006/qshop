import { AddressType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsBoolean, IsString, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsOptional()
  complement: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  zipcode: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => Boolean(value))
  main: boolean;

  @IsString()
  @IsNotEmpty()
  contactNumber: string;

  @IsString()
  @IsOptional()
  shippingInstructions: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value ?? AddressType.PERSONAL)
  type: AddressType;
}
