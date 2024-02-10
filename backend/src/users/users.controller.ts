import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Request,
  UseGuards,
  SetMetadata,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UseRoleHybridGuard } from 'src/authz/hybrid.guard';
import { AuthenticationGuard } from 'src/authz/authentication.guard';
import { AuthorizationGuard } from 'src/authz/authorization.guard';
import { AddressService } from 'src/address/address.service';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { UpdateAddressDto } from 'src/address/dto/update-address.dto';
import { Address } from 'qshop-sdk';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly addressService: AddressService,
  ) {}

  @Post()
  createOrUpdate(@Body() createUserDto: CreateUserDto) {
    console.log({ createUserDto });
    return this.usersService.createOrUpdate(createUserDto);
  }

  @Get(':id')
  async findOne(@Request() req: any, @Param('id') id: string) {
    const foundUser = await this.usersService.findById(id);
    if (!foundUser) {
      throw new NotFoundException();
    }

    return foundUser;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get(':userId/addresses')
  async findUserAddresses(@Param('userId') userId: string): Promise<Address[]> {
    return this.addressService.findUserAddresses(userId);
  }

  @Post(':userId/addresses/create')
  async createUserAddress(
    @Param('userId') userId: string,
    @Body() address: CreateAddressDto,
  ): Promise<Address> {
    return this.addressService.createUserAddress(userId, address);
  }

  @Patch(':userId/addresses/:addressId/update')
  async updateUserAddress(
    @Param('userId') userId: string,
    @Body() address: UpdateAddressDto,
  ): Promise<Address> {
    return this.addressService.updateUserAddress(userId, address);
  }
}
