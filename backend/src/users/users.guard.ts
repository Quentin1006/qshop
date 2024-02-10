import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { RoleName } from '@prisma/client';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserAuthorizationGuard {
  constructor(private reflector: Reflector, private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [req] = context.getArgs();
    const userId = req?.auth?.sub;
    const identifiedUserId = req?.params?.id;

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    if (user.role.name === RoleName.ADMIN || user.id === identifiedUserId) {
      return true;
    }
    throw new UnauthorizedException('You are not authorized to access this basket');
  }
}
