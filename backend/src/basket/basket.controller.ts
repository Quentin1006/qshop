import { Controller, Get, Post, Body, Param, Query, Delete } from '@nestjs/common';
import {} from 'qshop-sdk';

import { BasketService } from './basket.service';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Get(':basketId')
  getBasket(@Param('basketId') basketId: string, @Query('create') create: boolean) {
    return this.basketService.getBasket(basketId, { create });
  }

  @Get(':basketId/count')
  countBasketItems(@Param('basketId') basketId: string) {
    return this.basketService.countBasketItems(+basketId);
  }
}
