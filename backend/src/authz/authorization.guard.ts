import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizationGuard {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [req] = context.getArgs();
    const userPermissions = req?.auth?.permissions;
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler()) || [];

    const hasAllPermissions = requiredPermissions.every((permission) => userPermissions?.includes(permission));

    if (requiredPermissions.length === 0 || hasAllPermissions) {
      return true;
    }

    throw new UnauthorizedException();
  }
}
