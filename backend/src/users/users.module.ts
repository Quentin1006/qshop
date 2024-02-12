import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';
import { AuthzModule } from 'src/authz/authz.module';
import { AddressModule } from 'src/address/address.module';
import { AddressService } from 'src/address/address.service';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AddressService, CreateAddressDto],
  imports: [AuthzModule, AddressModule],
})
export class UsersModule {}
