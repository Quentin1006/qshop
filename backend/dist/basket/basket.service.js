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
exports.BasketService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const products_helper_1 = require("../products/products.helper");
let BasketService = class BasketService {
    constructor(prisma, productsHelper) {
        this.prisma = prisma;
        this.productsHelper = productsHelper;
    }
    async countBasketItems(basketId) {
        return await this.prisma.basketItem.count({
            where: {
                basketId,
            },
        });
    }
    async getBasket(basketId, { create = false }) {
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
        if (basket === null || basket === void 0 ? void 0 : basket.id) {
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
        if (!(basket === null || basket === void 0 ? void 0 : basket.id)) {
            return { refId: 's-000', items: [] };
        }
    }
};
BasketService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, products_helper_1.ProductsHelper])
], BasketService);
exports.BasketService = BasketService;
//# sourceMappingURL=basket.service.js.map