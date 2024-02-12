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
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticationGuard } from 'src/authz/authentication.guard';
import { UserAuthorizationGuard } from './users.guard';
import { AddressService } from 'src/address/address.service';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { UpdateAddressDto } from 'src/address/dto/update-address.dto';
import { type Address } from 'qshop-sdk';

@UseGuards(AuthenticationGuard, UserAuthorizationGuard)
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

  @Get(':id/addresses')
  async findUserAddresses(@Param('id') userId: string): Promise<Address[]> {
    return this.addressService.findUserAddresses(userId);
  }
}
