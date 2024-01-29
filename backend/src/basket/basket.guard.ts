import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BasketAuthorizationGuard {
  constructor(private reflector: Reflector, private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [req] = context.getArgs();
    const userId = req?.auth?.sub;
    const refId = req?.params?.refId;

    const userBaskets = await this.prisma.basket.findMany({
      where: {
        OR: [{ refId }, { userId }],
      },
    });

    // In this case we are in a creation process
    if (userBaskets.length === 0) {
      return true;
    }

    // Prevent the case undefined === undefined if userId is not provided
    const userBasketFromUserId = userBaskets.find((b) => userId && b.userId === userId);

    if (userBasketFromUserId) {
      return true;
    }
    const userBasketFromRefId = userBaskets.find((b) => refId && b.refId === refId);

    if (userBasketFromRefId.refId === userId) {
      return true;
    }

    if (userBasketFromRefId && userBasketFromRefId.anonymous) {
      return true;
    }

    throw new UnauthorizedException('You are not authorized to access this basket');
  }
}
