import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// export const JwtAuthGuard = AuthGuard('jwt');
// export const UseJwtAuthGuard = UseGuards(AuthGuard('jwt'));

@Injectable()
export class RoleProtectedGuard extends AuthGuard('jwt') {
  constructor(private requiredRoles: string[]) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (!this.requiredRoles) {
      return true;
    }
    console.log('before super activate');
    await super.canActivate(context);
    console.log('after super activate');
    // @FIXME: Find a way to include the role of the user, either by a request of by including it in the payload
    return this.requiredRoles.includes('admin');
  }
}
export const UseRoleProtectedGuard = (roles: string[]) => UseGuards(new RoleProtectedGuard(roles));
