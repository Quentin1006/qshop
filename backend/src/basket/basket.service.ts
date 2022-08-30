import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Basket } from 'qshop-sdk';
import { ProductsHelper } from 'src/products/products.helper';

@Injectable()
export class BasketService {
  constructor(private readonly prisma: PrismaService, private readonly productsHelper: ProductsHelper) {}

  async countBasketItems(basketId: number) {
    return await this.prisma.basketItem.count({
      where: {
        basketId,
      },
    });
  }

  async getBasket(basketId: string, { create = false }: { create: boolean }): Promise<Basket | null> {
    // @FIXME: Should use findUnique but i have an error
    const basket = await this.prisma.basket.findFirst({
      where: { refId: basketId },
      select: {
        id: true,
        refId: true,
        items: {
          select: {
            quantity: true,
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
      },
    });

    if (basket?.id) {
      return {
        refId: basket.refId,
        items: basket.items.map(({ quantity, product }) => {
          const { id, price, discount, name } = product;
          return {
            quantity,
            product: {
              id,
              name,
              price: this.productsHelper.createPrice({ discount, price, discountType: 'percentage' }),
            },
          };
        }),
      };
    }

    if (!basket?.id) {
      return { refId: 's-000', items: [] };
    }
  }

  // async createBasket(basketId: string) {
  //   this.prisma.basket.create({
  //     data: {},
  //   });
  // }
}
