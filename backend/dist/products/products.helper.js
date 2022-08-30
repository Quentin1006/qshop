"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsHelper = void 0;
const common_1 = require("@nestjs/common");
let ProductsHelper = class ProductsHelper {
    applyDiscount(price, discount, type) {
        if (type === 'percentage') {
            const priceAsNb = price.toNumber();
            return Number((priceAsNb - (priceAsNb * discount) / 100).toFixed());
        }
        else {
            throw new Error('Discount type not recognized');
        }
    }
    createPrice({ price, discount, discountType = 'percentage' }) {
        return {
            current: this.applyDiscount(price, discount, 'percentage'),
            raw: price.toNumber(),
            discount,
            discountType: discountType,
        };
    }
};
ProductsHelper = __decorate([
    (0, common_1.Injectable)()
], ProductsHelper);
exports.ProductsHelper = ProductsHelper;
//# sourceMappingURL=products.helper.js.map