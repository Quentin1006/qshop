"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasketModule = void 0;
const common_1 = require("@nestjs/common");
const basket_service_1 = require("./basket.service");
const basket_controller_1 = require("./basket.controller");
const prisma_service_1 = require("../prisma.service");
const products_module_1 = require("../products/products.module");
const products_helper_1 = require("../products/products.helper");
let BasketModule = class BasketModule {
};
BasketModule = __decorate([
    (0, common_1.Module)({
        controllers: [basket_controller_1.BasketController],
        imports: [products_module_1.ProductsModule],
        providers: [basket_service_1.BasketService, prisma_service_1.PrismaService, products_helper_1.ProductsHelper],
    })
], BasketModule);
exports.BasketModule = BasketModule;
//# sourceMappingURL=basket.module.js.map