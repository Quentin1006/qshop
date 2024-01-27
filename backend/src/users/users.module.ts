import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';
import { AuthzModule } from 'src/authz/authz.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  imports: [AuthzModule],
})
export class UsersModule {}
