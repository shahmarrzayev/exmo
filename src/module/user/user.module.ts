import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserController } from './controller/user.controller';
import { UserHelper } from './user.helper';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';
import { ContactEntity } from './entity/contact.entity';
import { StatusEntity } from './entity/status.entity';
import { ContactController } from './controller/contact.controller';
import { ContactService } from './service/contact.service';
import { ContactRepository } from './repository/contact.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ContactEntity, StatusEntity])],
  controllers: [UserController, ContactController],
  providers: [UserService, UserRepository, UserHelper, ContactService, ContactRepository],
  exports: [UserService, ContactService],
})
export class UserModule {}
