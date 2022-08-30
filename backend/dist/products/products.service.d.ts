import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetQueryProducts } from './dto/get-query-products';
import { Prisma } from '@prisma/client';
import { Product, ProductDetails } from 'qshop-sdk';
import { ProductsHelper } from './products.helper';
export declare class ProductsService {
    private readonly prisma;
    private readonly productsHelper;
    constructor(prisma: PrismaService, productsHelper: ProductsHelper);
    create(createProductDto: CreateProductDto): string;
    findAll(): Prisma.PrismaPromise<{
        id: number;
        price: Prisma.Decimal;
        discount: number;
        link: string;
        name: string;
        description: string;
        dateAdded: Date;
    }[]>;
    findSome(queries: GetQueryProducts): Prisma.PrismaPromise<{
        rate: {
            votes: number;
            value: Prisma.Decimal;
        };
        description: string;
        id: number;
        price: Prisma.Decimal;
        name: string;
        tags: {
            name: string;
        }[];
    }[]>;
    findById(id: number): Prisma.Prisma__ProductClient<{
        description: string;
        id: number;
        name: string;
        tags: {
            name: string;
        }[];
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    private getQuerySelect;
    private findWithCursor;
    private applyDiscount;
    private findManyWithOffset;
    findByCategory(category: string, { limit, offset }: {
        limit: any;
        offset: any;
    }): Promise<{
        data: Product[];
        total: number;
        pageInfo: {
            idxStart: number;
            idxEnd: number;
            hasNext: boolean;
        };
    }>;
    findWithDetailsById(id: number): Promise<ProductDetails>;
    remove(id: number): string;
}
