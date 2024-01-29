import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { expressJwtSecret } from 'jwks-rsa';
import { expressjwt } from 'express-jwt';
import { promisify } from 'util';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationGuard {
  constructor(private configService: ConfigService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const checkJwt = promisify(
      expressjwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.configService.get('AUTH0_DOMAIN')}/.well-known/jwks.json`,
        }) as any,
        audience: this.configService.get('AUTH0_AUDIENCE'),
        issuer: this.configService.get('AUTH0_DOMAIN') + '/',
        algorithms: ['RS256'],
      }),
    );

    const req = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);

    try {
      await checkJwt(req, res);
      return true;
    } catch (error) {
      const allowAnonymous =
        this.reflector.get<boolean>('allow-anonymous', context.getClass()) || false;
      if (error.code === 'credentials_required' && allowAnonymous) {
        return true;
      }
      throw new UnauthorizedException(error);
    }
  }
}
