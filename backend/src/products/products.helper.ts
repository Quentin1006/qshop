import { Injectable } from '@nestjs/common';
import { type Decimal } from '@prisma/client/runtime/library';
import { type Product } from 'qshop-sdk';

@Injectable()
export class ProductsHelper {
  private applyDiscount(price: Decimal, discount: number, type: Product['price']['discountType']): number {
    if (type === 'percentage') {
      const priceAsNb = price.toNumber();
      return Number((priceAsNb - (priceAsNb * discount) / 100).toFixed());
    } else {
      throw new Error('Discount type not recognized');
    }
  }
  createPrice({ price, discount, discountType = 'percentage' }) {
    return {
      current: this.applyDiscount(price, discount, 'percentage'),
      raw: price.toNumber(),
      discount,
      discountType: discountType as Product['price']['discountType'],
    };
  }
}
