import { RoleModule } from './../role/role.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthHelper } from './auth.helper';
import { AuthService } from './auth.service';

import { UserModule } from '../user/user.module';
import { getConfig } from '../../common/util';
import { EConfig } from '../../common/config.enum';

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule,
    UserModule,
    RoleModule,
    JwtModule.register({
      secret: getConfig(EConfig.EXMO_JWT_ACCESS_SECRET_KEY),
      signOptions: { expiresIn: '210h' },
    }),
  ],
  providers: [AuthHelper, AuthService],
  exports: [AuthService, JwtModule, AuthHelper],
})
export class AuthModule {}
