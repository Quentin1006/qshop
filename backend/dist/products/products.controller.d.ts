import { type Product, type OffsetResponse, type ProductDetails } from 'qshop-sdk';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetQueryProducts } from './dto/get-query-products';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): string;
    findSome(queries: GetQueryProducts): import(".prisma/client").Prisma.PrismaPromise<{
        rate: {
            votes: number;
            value: import("@prisma/client/runtime/library").Decimal;
        };
        description: string;
        id: number;
        price: import("@prisma/client/runtime/library").Decimal;
        name: string;
        tags: {
            name: string;
        }[];
    }[]>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        price: import("@prisma/client/runtime/library").Decimal;
        discount: number;
        link: string;
        name: string;
        description: string;
        dateAdded: Date;
    }[]>;
    findById(id: number): import(".prisma/client").Prisma.Prisma__ProductClient<{
        description: string;
        id: number;
        name: string;
        tags: {
            name: string;
        }[];
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findWithDetailsById(id: string): Promise<ProductDetails>;
    findByCategory(category: string, rawLimit: string, rawOffset: string): Promise<OffsetResponse<Product>>;
    remove(id: string): string;
}
