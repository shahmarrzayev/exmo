import { UserEntity } from '../../user/entity/user.entity';
import { MessageEntity } from './../entity/message.entity';
import { SaveMessageDto } from './../dto/saveMessage.dto';
import { MessageRepository } from './../repository/message.repository';
import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { UserService } from 'src/module/user/service/user.service';
import { encrypt } from 'src/common/cryption';
import { RoomRepository } from '../repository/room.repository';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly roomRepository: RoomRepository,
    private readonly userService: UserService,
  ) {}

  private readonly log = new Logger(MessageService.name);

  async create(dto: SaveMessageDto): Promise<MessageEntity> {
    this.log.debug('create -- start');
    if (!dto) {
      this.log.debug('create -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    const user = await this.userService.getById(dto.from);
    if (!user) {
      this.log.debug('create -- user not found');
      throw new InternalServerErrorException('user not found');
    }

    // const { blockedList } = user || {};
    // if (blockedList && !blockedList.includes(dto.to)) {
    //   this.log.debug('create -- you have blocked this user');
    //   throw new InternalServerErrorException('you have blocked this user');
    // }

    // const sendedUser = await this.userService.getById(dto.to);
    // const { blockedList: sendedUserBlockedList } = sendedUser || {};
    // if (sendedUserBlockedList && !sendedUserBlockedList.includes(dto.from)) {
    //   this.log.debug('create -- this user has blocked you');
    //   throw new InternalServerErrorException('this user has blocked you');
    // }

    const { mediaUrl, message } = dto;
    if (!mediaUrl && !message) {
      this.log.debug('create -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    const encryptedMessage = encrypt(message);
    if (!encryptedMessage) {
      this.log.error('create -- message could not encrypted');
      throw new InternalServerErrorException('message could not encrypted');
    }

    const room = await this.roomRepository.findById(dto.roomId);
    if (!room) {
      this.log.debug('create -- room not available');
      throw new InternalServerErrorException('room not available');
    }

    const entity = SaveMessageDto.toEntity(dto, encryptedMessage);
    entity.roomId = dto.roomId;

    const savedMessage = await this.messageRepository.save(entity);
    if (!savedMessage) {
      this.log.error('create -- could not saved message');
      throw new InternalServerErrorException('could not saved message');
    }

    this.log.debug('create -- success');
    return savedMessage;
  }

  async delete(user: UserEntity, id: string): Promise<MessageEntity> {
    this.log.debug('delete -- start');
    if (!id) {
      this.log.debug('delete -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    const message = await this.messageRepository.findById(id);
    if (!message) {
      this.log.debug('delete -- message not found');
      throw new InternalServerErrorException('message not found');
    }

    if (message.deletedBy.includes(user.id)) {
      this.log.debug('delete -- message already deleted');
      throw new InternalServerErrorException('message already deleted');
    }
    message.deletedBy = [...message.deletedBy, user.id];

    this.log.debug('delete -- success');
    return message;
  }

  async update(id: string, user: UserEntity, dto: SaveMessageDto): Promise<MessageEntity> {
    this.log.debug('update -- start');
    if (!dto) {
      this.log.debug('update -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    const message = await this.messageRepository.findById(id);
    if (!message) {
      this.log.debug('update -- message not found');
      throw new InternalServerErrorException('message not found');
    }

    let updatedEntity = { ...message, ...SaveMessageDto.toEntity(dto) };
    updatedEntity = await this.messageRepository.save(updatedEntity);
    if (!updatedEntity) {
      this.log.warn('update -- message not updated');
      throw new InternalServerErrorException('message not updated');
    }

    this.log.debug('update -- success');
    return updatedEntity;
  }
}
