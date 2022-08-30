import { Controller, Get, Post, Body, Param, Query, Delete } from '@nestjs/common';
import { type Product, type OffsetResponse, type ProductDetails } from 'qshop-sdk';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetQueryProducts } from './dto/get-query-products';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findSome(@Query() queries: GetQueryProducts) {
    return this.productsService.findSome(queries);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.productsService.findById(+id);
  }

  @Get(':id/details')
  findWithDetailsById(@Param('id') id: string): Promise<ProductDetails> {
    return this.productsService.findWithDetailsById(+id);
  }

  @Get('by-categories/:category')
  async findByCategory(
    @Param('category') category: string,
    @Query('limit') rawLimit: string,
    @Query('offset') rawOffset: string,
  ): Promise<OffsetResponse<Product>> {
    // @FIXME: Throw error if any of the param is missing
    const limit = Number(rawLimit || 10);
    const offset = Number(rawOffset || 0);
    return await this.productsService.findByCategory(category, { limit, offset });
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return this.productsService.remove(+id);
  }
}
