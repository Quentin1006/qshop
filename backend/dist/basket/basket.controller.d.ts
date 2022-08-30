import { BasketService } from './basket.service';
export declare class BasketController {
    private readonly basketService;
    constructor(basketService: BasketService);
    getBasket(basketId: string, create: boolean): Promise<import("qshop-sdk").Basket>;
    countBasketItems(basketId: string): Promise<number>;
}
