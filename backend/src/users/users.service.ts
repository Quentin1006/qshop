import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createOrUpdate({ id, email, createdAt, updatedAt, lastname, firstname }: CreateUserDto) {
    return this.prisma.user.upsert({
      where: { email },
      update: {
        email,
        updatedAt,
        lastname,
        firstname,
      },
      create: {
        id,
        email,
        createdAt,
        lastname,
        firstname,
        roleId: 3, // FIXME: For now role will be hardcoded and always 'USER'
      },
    });
  }

  findById(id: string) {
    return this.prisma.user.findFirst({
      where: { id },
      select: {
        email: true,
        firstname: true,
        lastname: true,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
