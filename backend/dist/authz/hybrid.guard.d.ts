import { ExecutionContext } from '@nestjs/common';
declare const RoleHybridGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class RoleHybridGuard extends RoleHybridGuard_base {
    constructor();
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare const UseRoleHybridGuard: () => MethodDecorator & ClassDecorator;
export {};
