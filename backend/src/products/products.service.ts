import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetQueryProducts } from './dto/get-query-products';
import { Prisma } from '@prisma/client';
import { type Product, type ProductDetails } from 'qshop-sdk';
import { Decimal } from '@prisma/client/runtime/library';
import { ProductsHelper } from './products.helper';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsHelper: ProductsHelper,
  ) {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return this.prisma.product.findMany({});
  }

  findSome(queries: GetQueryProducts) {
    return this.prisma.product.findMany({
      where: {
        AND: [{ name: { contains: queries.search } }, { tags: { some: { name: queries.tag } } }],
      },
      take: 10,
      skip: 0,
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        rate: {
          select: {
            value: true,
            votes: true,
          },
        },
        tags: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  findById(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        link: true,
        tags: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  private getQuerySelect() {
    return Prisma.validator<Prisma.ProductSelect>()({
      id: true,
      name: true,
      description: true,
      discount: true,
      sku: true,
      tags: {
        select: {
          name: true,
        },
      },
      price: true,
      dateAdded: true,
      link: true,
      rate: {
        select: {
          value: true,
          votes: true,
        },
      },
    });
  }

  private async findWithCursor({ query, cursor }) {
    if (!query.take) {
      query.take = 10; // take 10 by default
    }
    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        ...query,
        ...{
          skip: 1,
        },
        ...(cursor ? { cursor: { id: cursor } } : {}),
      }),
      this.prisma.product.count({
        ...query,
        select: undefined,
      }),
    ]);

    const nextCursor = data.length === query.take ? data[data.length - 1] : null;

    return {
      data,
      total,
      nextCursor,
    };
  }

  private applyDiscount(
    price: Decimal,
    discount: number,
    type: Product['price']['discountType'],
  ): number {
    if (type === 'percentage') {
      const priceAsNb = price.toNumber();
      return Number((priceAsNb - (priceAsNb * discount) / 100).toFixed());
    } else {
      throw new Error('Discount type not recognized');
    }
  }

  private async findManyWithOffset({ query }: { query: Prisma.ProductFindManyArgs }) {
    if (!query.take) {
      query.take = 10; // take 10 by default
    }
    if (!query.skip) {
      query.skip = 0; // start from the first
    }

    const selectQuery = this.getQuerySelect();

    const [dataWithoutType, total] = await Promise.all([
      this.prisma.product.findMany({
        ...query,
        select: selectQuery,
      }),
      this.prisma.product.count({
        where: query.where,
      }),
    ]);

    const data: Product[] = dataWithoutType.map(
      ({ link, description, id, name, dateAdded, rate, sku, tags, price, discount }) => ({
        link,
        description,
        id,
        name,
        dateAdded,
        sku: sku > 20 ? 20 : sku,
        rate: {
          value: rate.value.toNumber(),
          votes: rate.votes,
        },
        tags,
        price: this.productsHelper.createPrice({
          price,
          discount,
          discountType: 'percentage',
        }),
      }),
    );
    const idxEnd = Math.min(query.skip + query.take, total);

    return {
      data,
      total,
      pageInfo: {
        idxStart: query.skip + 1,
        idxEnd,
        hasNext: idxEnd < total,
      },
    };
  }

  async findByCategory(category: string, { limit, offset }) {
    // @FIXME: Actually pick the most sold
    if (category === 'bestsellers') {
      return await this.findManyWithOffset({
        query: {
          take: limit,
          skip: offset,
        },
      });
    }

    if (category === 'brand_new') {
      return await this.findManyWithOffset({
        query: {
          take: limit,
          skip: offset,
          orderBy: {
            dateAdded: 'desc',
          },
        },
      });
    }

    // @FIXME: Actually pick the flash sells
    if (category === 'flash_sells') {
      return await this.findManyWithOffset({
        query: {
          take: 20,
        },
      });
    }

    return await this.findManyWithOffset({
      query: {
        take: 20,
        where: {
          tags: { some: { name: category } },
        },
      },
    });
  }

  async findWithDetailsById(id: number) {
    const productDetailsFromDb = await this.prisma.productDetails.findUnique({
      where: { productId: id },
      select: {
        productId: true,
        longDescription: true,
        brand: true,
        caracteristics: true,
        returnPolicy: {
          select: {
            details: true,
            delayPeriodInDays: true,
            type: true,
            fees: true,
          },
        },
        product: {
          select: {
            id: true,
            link: true,
            sku: true,
            dateAdded: true,
            tags: {
              select: {
                name: true,
                id: true,
              },
            },
            name: true,
            description: true,
            price: true,
            rate: {
              select: {
                value: true,
                votes: true,
              },
            },
            discount: true,
          },
        },
        promotion: {
          select: {
            message: true,
          },
        },
        technicalDescription: true,
        store: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const product = productDetailsFromDb.product;
    const rawPrice = product.price;
    delete productDetailsFromDb.product;
    const ret: ProductDetails = {
      ...product,
      brand: productDetailsFromDb.brand,
      returnPolicy: productDetailsFromDb.returnPolicy,
      longDescription: productDetailsFromDb.longDescription,
      store: productDetailsFromDb.store,
      rate: {
        value: product.rate.value.toNumber(),
        votes: product.rate.votes,
      },
      sku: product.sku > 20 ? 20 : product.sku,
      price: {
        current: this.applyDiscount(rawPrice, product.discount, 'percentage'),
        raw: rawPrice.toNumber(),
        discount: product.discount,
        discountType: 'percentage',
      },
      caracteristics: JSON.parse(productDetailsFromDb.caracteristics) as string[],
      technicalDescription: JSON.parse(productDetailsFromDb.technicalDescription),
    };

    return ret;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
