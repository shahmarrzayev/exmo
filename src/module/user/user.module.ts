import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserController } from './controller/user.controller';
import { UserHelper } from './user.helper';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserHelper, UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
