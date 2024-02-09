import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BasketItemState } from '@prisma/client';

export type AddBasketItemInput = {
  refId: string;
  productId: number;
  quantity: number;
};

export type PatchBasketItemInput = {
  refId: string;
  id: number;
  state: BasketItemState;
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
    const basketItem = await this.prisma.basketItem.findFirst({
      where: {
        basketId: refId,
        productId,
      },
    });

    const updateBasket = this.prisma.basket.update({
      where: {
        refId,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    let upsertBasketItem;
    if (basketItem?.id) {
      upsertBasketItem = this.prisma.basketItem.update({
        where: {
          basketId_id: {
            basketId: refId,
            id: basketItem.id,
          },
        },
        data: {
          state: BasketItemState.ACTIVE,
          quantity: (basketItem?.quantity ?? 0) + quantity,
        },
      });
    } else {
      upsertBasketItem = this.prisma.basketItem.create({
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
    }
    await this.prisma.$transaction([updateBasket, upsertBasketItem]);
  }

  async patchBasketItem({ refId, id, state, quantity }: PatchBasketItemInput) {
    const data: Partial<PatchBasketItemInput> = {};
    if (state) {
      data.state = state;
    }
    if (quantity) {
      data.quantity = quantity;
    }

    const updateBasket = this.prisma.basket.update({
      where: {
        refId,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    const patchBasketItem = this.prisma.basketItem.update({
      where: {
        basketId_id: {
          basketId: refId,
          id,
        },
      },
      data,
    });

    const result = await this.prisma.$transaction([updateBasket, patchBasketItem]);
    return { result };
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
    return await this.prisma.$transaction([updateBasket, deleteBasketItem]);
  }
}
