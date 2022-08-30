"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const client_1 = require("@prisma/client");
const products_helper_1 = require("./products.helper");
let ProductsService = class ProductsService {
    constructor(prisma, productsHelper) {
        this.prisma = prisma;
        this.productsHelper = productsHelper;
    }
    create(createProductDto) {
        return 'This action adds a new product';
    }
    findAll() {
        return this.prisma.product.findMany({});
    }
    findSome(queries) {
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
    findById(id) {
        return this.prisma.product.findFirst({
            where: { id },
            select: {
                id: true,
                name: true,
                description: true,
                tags: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }
    getQuerySelect() {
        return client_1.Prisma.validator()({
            id: true,
            name: true,
            description: true,
            discount: true,
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
    async findWithCursor({ query, cursor }) {
        if (!query.take) {
            query.take = 10;
        }
        const [data, total] = await Promise.all([
            this.prisma.product.findMany(Object.assign(Object.assign(Object.assign({}, query), {
                skip: 1,
            }), (cursor ? { cursor: { id: cursor } } : {}))),
            this.prisma.product.count(Object.assign(Object.assign({}, query), { select: undefined })),
        ]);
        const nextCursor = data.length === query.take ? data[data.length - 1] : null;
        return {
            data,
            total,
            nextCursor,
        };
    }
    applyDiscount(price, discount, type) {
        if (type === 'percentage') {
            const priceAsNb = price.toNumber();
            return Number((priceAsNb - (priceAsNb * discount) / 100).toFixed());
        }
        else {
            throw new Error('Discount type not recognized');
        }
    }
    async findManyWithOffset({ query }) {
        if (!query.take) {
            query.take = 10;
        }
        if (!query.skip) {
            query.skip = 0;
        }
        const selectQuery = this.getQuerySelect();
        const [dataWithoutType, total] = await Promise.all([
            this.prisma.product.findMany(Object.assign(Object.assign({}, query), { select: selectQuery })),
            this.prisma.product.count({
                where: query.where,
            }),
        ]);
        const data = dataWithoutType.map(({ link, description, id, name, dateAdded, rate, tags, price, discount }) => ({
            link,
            description,
            id,
            name,
            dateAdded,
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
        }));
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
    async findByCategory(category, { limit, offset }) {
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
    async findWithDetailsById(id) {
        const productDetailsFromDb = await this.prisma.productDetails.findUnique({
            where: { productId: id },
            select: {
                sku: true,
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
        const ret = Object.assign(Object.assign({}, product), { brand: productDetailsFromDb.brand, returnPolicy: productDetailsFromDb.returnPolicy, longDescription: productDetailsFromDb.longDescription, store: productDetailsFromDb.store, rate: {
                value: product.rate.value.toNumber(),
                votes: product.rate.votes,
            }, inStock: productDetailsFromDb.sku > 20 ? 1000 : productDetailsFromDb.sku, price: {
                current: this.applyDiscount(rawPrice, product.discount, 'percentage'),
                raw: rawPrice.toNumber(),
                discount: product.discount,
                discountType: 'percentage',
            }, caracteristics: JSON.parse(productDetailsFromDb.caracteristics), technicalDescription: JSON.parse(productDetailsFromDb.technicalDescription) });
        return ret;
    }
    remove(id) {
        return `This action removes a #${id} product`;
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, products_helper_1.ProductsHelper])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map