import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BasketItemState } from '@prisma/client';

@Injectable()
export class BasketItemService {
  constructor(private readonly prisma: PrismaService) {}

  addBasketItem(basketId: string, productId: number, quantity: number) {
    return this.prisma.basketItem.create({
      data: {
        basket: {
          connect: {
            refId: basketId,
          },
        },
        product: {
          connect: {
            id: productId,
          },
        },
        state: BasketItemState.ACTIVE,
        quantity,
      },
    });
  }
}
