import { PrismaService } from '../prisma.service';
import { Basket } from 'qshop-sdk';
import { ProductsHelper } from 'src/products/products.helper';
export declare class BasketService {
    private readonly prisma;
    private readonly productsHelper;
    constructor(prisma: PrismaService, productsHelper: ProductsHelper);
    countBasketItems(basketId: number): Promise<number>;
    getBasket(basketId: string, { create }: {
        create: boolean;
    }): Promise<Basket | null>;
}
