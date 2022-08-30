import { Controller, Get, Post, Body, Param, Delete, NotFoundException, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UseRoleProtectedGuard } from 'src/authz/protected.guard';
import { UseRoleHybridGuard } from 'src/authz/hybrid.guard';

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
  @UseRoleProtectedGuard(['basic', 'high', 'admin'])
  async findOne(@Param('id') id: string) {
    const foundUser = await this.usersService.findById(id);
    if (!foundUser) {
      throw new NotFoundException();
    }

    return foundUser;
  }

  @Get('/hybrid/:id')
  @UseRoleHybridGuard()
  async findTwo(@Param('id') id: string, @Request() req: any) {
    console.log(req.user);
    return req.user;
    const foundUser = await this.usersService.findById(id);
    if (!foundUser) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
