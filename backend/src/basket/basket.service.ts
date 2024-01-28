import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Basket } from 'qshop-sdk';
import { ProductsHelper } from 'src/products/products.helper';
import { BasketItemState } from '@prisma/client';
import { UnwrapPromise } from 'src/typings';

@Injectable()
export class BasketService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsHelper: ProductsHelper,
  ) {}

  async countBasketItems(basketId: string) {
    return await this.prisma.basketItem.count({
      where: {
        basketId,
      },
    });
  }

  async mergeBaskets(basketFromBasketId: Basket, basketFromUser: Basket): Promise<Basket> {
    const updateBasketItemPromises = basketFromBasketId.items
      .filter(
        (item) =>
          item.product.id !=
          basketFromUser.items.find((i) => i.product.id === item.product.id)?.product.id,
      )
      .map((item) => {
        return this.prisma.basketItem.update({
          where: { id: item.id },
          data: {
            basketId: basketFromUser.refId,
          },
        });
      });
    await this.prisma.$transaction(updateBasketItemPromises);

    return await this.getBasket(basketFromUser.refId, { create: true, anonymous: false });
  }

  async findBasket(basketId: string) {
    return await this.prisma.basket.findFirst({
      where: {
        refId: basketId,
      },
      select: this.getSelectQuery(),
    });
  }

  async getBasket(
    basketId: string,
    { create = false, anonymous = true }: { create: boolean; anonymous: boolean },
  ): Promise<Basket | null> {
    // @FIXME: Should use findUnique but i have an error
    const basket = await this.findBasket(basketId);

    if (basket?.refId) {
      return this.generateBasketOutput(basket);
    }

    if (!basket?.refId && create) {
      return await this.createBasket(basketId, anonymous);
    }
  }

  async createBasket(basketId: string, anonymous: boolean): Promise<Basket> {
    const newBasket = await this.prisma.basket.create({
      data: {
        refId: basketId,
        anonymous,
        state: BasketItemState.ACTIVE,
      },
    });

    return {
      refId: newBasket.refId,
      anonymous: newBasket.anonymous,
      items: [],
    };
  }

  getSelectQuery() {
    return {
      refId: true,
      anonymous: true,
      items: {
        select: {
          quantity: true,
          id: true,
          product: {
            select: {
              name: true,
              price: true,
              id: true,
              discount: true,
            },
          },
        },
      },
    };
  }

  // FIXME: Should be typed
  generateBasketOutput(basket: UnwrapPromise<ReturnType<typeof this.findBasket>>) {
    return {
      refId: basket.refId,
      anonymous: basket.anonymous,
      items: basket.items.map(({ id, quantity, product }) => {
        const { price, discount, name } = product;
        return {
          quantity,
          id,
          product: {
            id: product.id,
            name,
            price: this.productsHelper.createPrice({
              discount,
              price,
              discountType: 'percentage',
            }),
          },
        };
      }),
    };
  }
}
