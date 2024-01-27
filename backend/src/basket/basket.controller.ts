import {
  Controller,
  Get,
  Param,
  UseGuards,
  SetMetadata,
  ForbiddenException,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { Basket } from 'qshop-sdk';

import { BasketService } from './basket.service';
import { BasketItemService } from './basket-item.service';
import { AuthenticationGuard } from 'src/authz/authentication.guard';

@Controller('basket')
export class BasketController {
  constructor(
    private readonly basketService: BasketService,
    private readonly basketItemService: BasketItemService,
  ) {}

  @Get(':basketId')
  @UseGuards(AuthenticationGuard)
  @SetMetadata('allow-anonymous', true)
  async getBasket(
    @Param('basketId') basketId: string,
    @Request() req,
  ): Promise<Basket | ForbiddenException> {
    const userId = (req as any).auth?.sub;

    if (userId) {
      if (userId === basketId) {
        const basketFromUser = await this.basketService.getBasket(userId, {
          create: true,
          anonymous: false,
        });
        return basketFromUser;
      }

      // User logged in after adding items to basket as anon
      // At this point he is supposed to have a basket
      const [basketFromBasketId, basketFromUser] = await Promise.all([
        this.basketService.getBasket(basketId, { create: false, anonymous: true }),
        this.basketService.getBasket(userId, { create: false, anonymous: false }),
      ]);

      if (!basketFromBasketId.anonymous) {
        // Make sure you don't access somebody else's basket
        return new ForbiddenException('You are not authorized to get this basket');
      }

      const mergedBasket = await this.basketService.mergeBaskets(
        basketFromBasketId,
        basketFromUser,
      );
      return mergedBasket;
    }

    const basketFromBasketId = await this.basketService.getBasket(basketId, {
      create: false,
      anonymous: true,
    });
    if (basketFromBasketId?.refId && !basketFromBasketId.anonymous) {
      return new ForbiddenException(
        'You are trying to access a basket that belongs to another user',
      );
    }

    if (!basketFromBasketId?.refId) {
      return await this.basketService.createBasket(basketId, true);
    }

    return basketFromBasketId;
  }

  @Post(':basketId/addItem')
  @UseGuards(AuthenticationGuard)
  @SetMetadata('allow-anonymous', true)
  async addBasketItem(
    @Param('basketId') basketId: string,
    @Body('quantity') quantity: string,
    @Body('productId') productId: string,
  ) {
    return this.basketItemService.addBasketItem(basketId, +productId, +quantity);
  }

  @Get(':basketId/count')
  countBasketItems(@Param('basketId') basketId: string) {
    return this.basketService.countBasketItems(basketId);
  }
}
