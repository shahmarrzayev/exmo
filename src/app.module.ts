import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';

import { AuthMiddleware } from './module/auth/auth.middleware';
import { RoleModule } from './module/role/role.module';
import { TwilioModule } from 'nestjs-twilio';
import { EConfig } from './common/config.enum';
import { PostModule } from './module/post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
    RoleModule,
    // S3Module,
    // MessageModule,
    // PostModule,
    // TwilioModule.forRoot({
    //   accountSid: getConfig(EConfig.TWILIO_ACCOUNT_SID),
    //   authToken: getConfig(EConfig.TWILIO_AUTH_TOKEN),
    // }),
  ],
  // providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/api/auth/*', method: RequestMethod.ALL })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
