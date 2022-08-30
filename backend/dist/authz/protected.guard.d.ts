import { ExecutionContext } from '@nestjs/common';
declare const RoleProtectedGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class RoleProtectedGuard extends RoleProtectedGuard_base {
    private requiredRoles;
    constructor(requiredRoles: string[]);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare const UseRoleProtectedGuard: (roles: string[]) => MethodDecorator & ClassDecorator;
export {};
