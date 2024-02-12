import { Controller, Get, Post, Body, Delete, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from 'qshop-sdk';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AuthenticationGuard } from 'src/authz/authentication.guard';
import { AddressAuthorizationGuard } from './address.guard';

@UseGuards(AuthenticationGuard, AddressAuthorizationGuard)
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('/fake')
  async getFakeAddress() {
    return this.addressService.getFakeAddress();
  }

  @Post('/fake/create')
  async fake(@Body() payload: { name: string }) {
    console.log({ payload });
    return this.addressService.createFakeAddress(payload.name);
  }

  @Get(':addressId')
  async getAddress(@Param('addressId') addressId: string): Promise<Address> {
    return this.addressService.getAddress(+addressId);
  }

  @Post('create')
  async createUserAddress(
    @Req() req: Request,
    @Body() address: CreateAddressDto,
  ): Promise<Address> {
    const userId = (req as any).auth?.sub as string;
    return this.addressService.createUserAddress(userId, address);
  }

  @Patch(':addressId/update')
  async updateUserAddress(
    @Req() req: Request,
    @Body() address: UpdateAddressDto,
  ): Promise<Address> {
    const userId = (req as any).auth?.sub as string;
    return this.addressService.updateUserAddress(userId, address);
  }

  @Delete(':addressId/delete')
  async deleteUserAddress(
    @Req() req: Request,
    @Param('addressId') addressId: string,
  ): Promise<Address> {
    const userId = (req as any).auth?.sub as string;
    return this.addressService.deleteUserAddress(userId, +addressId);
  }
}
