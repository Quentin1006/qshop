import { Controller, Get, Post, Body } from '@nestjs/common';
import { AddressService } from './address.service';

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
}
