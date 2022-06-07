import { UserModule } from './../user/user.module';
import { MessageEntity } from './entity/message.entity';
import { MessageRepository } from './repository/message.repository';
import { MessageService } from './service/message.service';
import { Module } from '@nestjs/common';
import { MessageController } from './controller/message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity]), UserModule],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository],
  exports: [MessageService],
})
export class MessageModule {}
