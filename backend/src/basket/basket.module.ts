import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketItemService } from './basket-item.service';
import { BasketController } from './basket.controller';
import { PrismaService } from 'src/prisma.service';
import { ProductsModule } from 'src/products/products.module';
import { ProductsHelper } from 'src/products/products.helper';

@Module({
  controllers: [BasketController],
  imports: [ProductsModule],
  providers: [BasketService, BasketItemService, PrismaService, ProductsHelper],
})
export class BasketModule {}
