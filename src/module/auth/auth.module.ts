import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthHelper } from './auth.helper';
import { AuthService } from './auth.service';

import { UserModule } from '../user/user.module';
import { getConfig } from '../../common/util';
import { EConfig } from '../../common/config.enum';
import { VerificationModule } from '../verification/verification.module';

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule,
    UserModule,
    JwtModule.register({
      secret: getConfig(EConfig.DOCTORO_JWT_ACCESS_SECRET_KEY),
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  providers: [AuthHelper, AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
