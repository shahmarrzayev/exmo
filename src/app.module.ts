import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './module/auth/decorator/permissions.guard';
import { AuthMiddleware } from './module/auth/auth.middleware';
import { RoleModule } from './module/role/role.module';
// import { VerificationModule } from './module/verification/verification.module';
// import { TwilioModule } from 'nestjs-twilio';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
    RoleModule,
    // VerificationModule,
    // TwilioModule.forRoot({
    //   accountSid: 'AC54e4db69a9747c37bf4a54b5f4467bf5',
    //   authToken: '8ec161fcffb030335119ad4934a2a947',
    // }),
  ],
  providers: [{ provide: APP_GUARD, useClass: PermissionsGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/api/*');
  }
}
