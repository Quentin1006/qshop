import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { AuthzModule } from './authz/authz.module';
import { BasketModule } from './basket/basket.module';

@Module({
  imports: [UsersModule, CategoriesModule, ProductsModule, AuthzModule, BasketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
