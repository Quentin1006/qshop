import {
  Controller,
  Get,
  Param,
  UseGuards,
  SetMetadata,
  ForbiddenException,
  Req,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { Basket } from 'qshop-sdk';

import { BasketService } from './basket.service';
import { BasketItemService } from './basket-item.service';
import { AuthenticationGuard } from 'src/authz/authentication.guard';
import { Request } from 'express';
import { BasketAuthorizationGuard } from './basket.guard';
import { AddItemDto } from './dto/add-item.dto';
import { DeleteItemDto } from './dto/delete-item.dto';
import { PatchItemDto } from './dto/patch-item.dto';

@UseGuards(AuthenticationGuard, BasketAuthorizationGuard)
@SetMetadata('allow-anonymous', true)
@Controller('basket')
export class BasketController {
  constructor(
    private readonly basketService: BasketService,
    private readonly basketItemService: BasketItemService,
  ) {}

  @Get(':refId')
  async getBasketFromRefIdOrUserId(
    @Param('refId') refId: string,
    @Req() req: Request,
  ): Promise<Basket | ForbiddenException> {
    const userId = (req as any).auth?.sub as string;
    return this.basketService.getBasketFromRefIdOrUserId(refId, userId);
  }

  @Post(':refId/add-item')
  async addBasketItem(
    @Param('refId') refId: string,
    @Body() addItemDto: AddItemDto,
    @Req() req: Request,
  ) {
    const userId = (req as any).auth?.sub as string;
    const { productId, quantity } = addItemDto;
    refId = userId ?? refId;
    return this.basketItemService.addBasketItem({ refId, productId, quantity });
  }

  @Patch(':refId/update-item')
  async updateBasketItem(
    @Param('refId') refId: string,
    @Body() patchItemDto: PatchItemDto,
    @Req() req: Request,
  ) {
    const userId = (req as any).auth?.sub as string;
    const { state, quantity, id } = patchItemDto;
    refId = userId ?? refId;
    return this.basketItemService.patchBasketItem({ refId, state, quantity, id });
  }

  @Delete(':refId/delete-item')
  async deleteBasketItem(@Param('refId') refId: string, @Body() deleteItemDto: DeleteItemDto) {
    const { id } = deleteItemDto;
    return this.basketItemService.deleteBasketItem({ refId, basketItemId: id });
  }

  @Get(':refId/count')
  countBasketItems(@Param('refId') refId: string) {
    return this.basketService.countBasketItems(refId);
  }
}
