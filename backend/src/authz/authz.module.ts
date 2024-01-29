import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationGuard } from './authentication.guard';

@Module({
  imports: [ConfigModule],
  providers: [ConfigService, AuthenticationGuard],
  exports: [AuthenticationGuard],
})
export class AuthzModule {}
