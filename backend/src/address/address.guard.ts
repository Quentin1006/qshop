import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { RoleName } from '@prisma/client';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AddressAuthorizationGuard {
  constructor(private reflector: Reflector, private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [req] = context.getArgs();
    const userId = req?.auth?.sub;
    const addressId = req?.params?.addressId;

    if (!addressId) {
      return true;
    }

    const address = await this.prisma.address.findUnique({
      where: {
        id: Number(addressId),
      },
      select: {
        user: {
          select: {
            id: true,
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (address.user.id === userId || address.user.role.name === RoleName.ADMIN) {
      return true;
    }
    throw new UnauthorizedException('You are not authorized to access this basket');
  }
}
