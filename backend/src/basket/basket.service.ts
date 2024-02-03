import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Basket } from 'qshop-sdk';
import { ProductsHelper } from 'src/products/products.helper';
import { BasketItemState, Prisma } from '@prisma/client';
import { UnwrapPromise } from 'src/typings';

export type MergeBasketsInput =
  | {
      basketFromBasketId: Basket;
      basketFromUserId: Basket;
      userId?: string;
    }
  | { basketFromBasketId: Basket; userId: string; basketFromUserId?: Basket };

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

  async mergeBaskets({
    basketFromBasketId,
    basketFromUserId,
    userId,
  }: MergeBasketsInput): Promise<Basket> {
    if (!basketFromUserId?.refId) {
      basketFromUserId = await this.createBasket(userId, { anonymous: false });
    }

    const updateBasketItemPromises = basketFromBasketId.items
      .filter(
        (item) =>
          item.product.id !=
          basketFromUserId.items.find((i) => i.product.id === item.product.id)?.product.id,
      )
      .map((item) => {
        return this.prisma.basketItem.update({
          where: { id: item.id },
          data: {
            basketId: basketFromUserId.refId,
          },
        });
      });
    await this.prisma.$transaction(updateBasketItemPromises);

    return await this.getBasket(basketFromUserId.refId, { create: true, anonymous: false });
  }

  async findBasket(basketId: string) {
    return await this.prisma.basket.findFirst({
      where: {
        refId: basketId,
      },
      select: this.getSelectQuery(),
    });
  }

  async getBasketFromRefIdOrUserId(refId: string, userId?: string) {
    if (userId) {
      if (userId === refId) {
        const userBasketFromUserId = await this.getBasket(userId, {
          create: true,
          anonymous: false,
        });
        return userBasketFromUserId;
      }

      // User logged in after adding items to basket as anon
      // At this point he is supposed to have a basket
      const [userBasketFromRefId, userBasketFromUserId] = await Promise.all([
        this.getBasket(refId, { create: false, anonymous: true }),
        this.getBasket(userId, { create: false, anonymous: false }),
      ]);

      if (!userBasketFromRefId.anonymous) {
        // Make sure you don't access somebody else's basket
        return new ForbiddenException('You are not authorized to get this basket');
      }

      const mergedBasket = await this.mergeBaskets({
        basketFromBasketId: userBasketFromRefId,
        basketFromUserId: userBasketFromUserId,
        userId,
      });
      return mergedBasket;
    }

    const anonBasketFromRefId = await this.getBasket(refId, {
      create: false,
      anonymous: true,
    });
    if (anonBasketFromRefId?.refId && !anonBasketFromRefId.anonymous) {
      return new ForbiddenException(
        'You are trying to access a basket that belongs to another user',
      );
    }

    if (!anonBasketFromRefId?.refId) {
      return await this.createBasket(refId, { anonymous: true });
    }

    return anonBasketFromRefId;
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
      return await this.createBasket(basketId, { anonymous });
    }
  }

  async createBasket(refId: string, { anonymous }: { anonymous: boolean }): Promise<Basket> {
    const newBasket = await this.prisma.basket.create({
      data: {
        refId,
        anonymous,
        state: BasketItemState.ACTIVE,
        ...(anonymous ? {} : { user: { connect: { id: refId } } }),
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
          state: true,
          product: {
            select: {
              sku: true,
              name: true,
              price: true,
              id: true,
              discount: true,
              link: true,
            },
          },
        },
        orderBy: {
          dateAdded: 'asc',
        },
      },
    } satisfies Prisma.BasketSelect;
  }

  // FIXME: Should be typed
  generateBasketOutput(basket: UnwrapPromise<ReturnType<typeof this.findBasket>>) {
    return {
      refId: basket.refId,
      anonymous: basket.anonymous,
      items: basket.items.map(({ id, quantity, product, state }) => {
        const { price, discount, name, link, sku } = product;
        return {
          quantity,
          id,
          state,
          product: {
            id: product.id,
            name,
            link,
            sku: sku > 20 ? 20 : sku, // FIXME: Make it a helper to reuse everywhere
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
