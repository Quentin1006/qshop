import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma.service';
import { ProductsHelper } from './products.helper';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, ProductsHelper],
  exports: [ProductsHelper],
})
export class ProductsModule {}
