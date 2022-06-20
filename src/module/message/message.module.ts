import { UserModule } from './../user/user.module';
import { MessageEntity } from './entity/message.entity';
import { MessageRepository } from './repository/message.repository';
import { MessageService } from './service/message.service';
import { Module } from '@nestjs/common';
import { MessageController } from './controller/message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageGateway } from './message.gateway';
import { RoomEntity } from './entity/room.entity';
import { RoomController } from './controller/room.controller';
import { RoomService } from './service/room.service';
import { RoomRepository } from './repository/room.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, RoomEntity]), UserModule],
  controllers: [RoomController, MessageController],
  providers: [RoomService, RoomRepository, MessageService, MessageRepository, MessageGateway],
  exports: [MessageService],
})
export class MessageModule {}
