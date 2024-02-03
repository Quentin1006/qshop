import { IsNumber, IsNotEmpty, ValidateIf, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import Prisma from '@prisma/client';

export class PatchItemDto {
  @IsNumber()
  @ValidateIf((o) => !o.state || o.quantity)
  @Transform(({ value }) => parseInt(value))
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  id: number;

  @IsString()
  @ValidateIf((o) => !o.quantity || o.state)
  state: Prisma.BasketItemState;
}
