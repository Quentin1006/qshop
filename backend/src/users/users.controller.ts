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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UseRoleHybridGuard } from 'src/authz/hybrid.guard';
import { AuthenticationGuard } from 'src/authz/authentication.guard';
import { AuthorizationGuard } from 'src/authz/authorization.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createOrUpdate(@Body() createUserDto: CreateUserDto) {
    console.log({ createUserDto });
    return this.usersService.createOrUpdate(createUserDto);
  }

  @Get('random')
  async findRandom() {
    return {
      id: 3,
    };
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
}
