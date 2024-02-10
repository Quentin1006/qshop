import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaService } from '../prisma.service';
import { AuthzModule } from 'src/authz/authz.module';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Module({
  controllers: [AddressController],
  providers: [AddressService, PrismaService, UpdateAddressDto, CreateAddressDto],
  imports: [AuthzModule],
  exports: [AddressService, UpdateAddressDto, CreateAddressDto],
})
export class AddressModule {}
