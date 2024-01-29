import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BasketItemState } from '@prisma/client';

export type AddBasketItemInput = {
  refId: string;
  productId: number;
  quantity: number;
};

export type DeleteBasketItemInput = {
  refId: string;
  basketItemId: number;
};

@Injectable()
export class BasketItemService {
  constructor(private readonly prisma: PrismaService) {}

  async addBasketItem({ refId, productId, quantity }: AddBasketItemInput) {
    const updateBasket = this.prisma.basket.update({
      where: {
        refId,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    const createBasketItem = this.prisma.basketItem.create({
      data: {
        basket: {
          connect: {
            refId,
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

    await this.prisma.$transaction([updateBasket, createBasketItem]);
  }

  async deleteBasketItem({ refId, basketItemId }: DeleteBasketItemInput) {
    const updateBasket = this.prisma.basket.update({
      where: {
        refId,
      },
      data: {
        updatedAt: new Date(),
      },
    });
    const deleteBasketItem = this.prisma.basketItem.delete({
      where: {
        id: basketItemId,
      },
      select: {
        id: true,
        productId: true,
      },
    });
    await this.prisma.$transaction([updateBasket, deleteBasketItem]);
  }
}
