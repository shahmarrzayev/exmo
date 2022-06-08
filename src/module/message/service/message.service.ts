import { UserEntity } from './../../user/user.entity';
import { MessageEntity } from './../entity/message.entity';
import { SaveMessageDto } from './../dto/saveMessage.dto';
import { MessageRepository } from './../repository/message.repository';
import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { UserService } from 'src/module/user/user.service';
import { encrypt } from 'src/common/cryption';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly userService: UserService,
  ) {}

  private readonly log = new Logger(MessageService.name);

  async create(user: UserEntity, dto: SaveMessageDto): Promise<MessageEntity> {
    this.log.debug('create -- start');
    if (!dto) {
      this.log.debug('create -- invalid argument(s)');
      throw new InternalServerErrorException();
    }

    const { blockedList } = user || {};
    if (blockedList && !blockedList.includes(dto.to)) {
      this.log.debug('create -- you have blocked this user');
      throw new InternalServerErrorException();
    }

    const sendedUser = await this.userService.getById(dto.to);
    const { blockedList: sendedUserBlockedList } = sendedUser || {};
    if (sendedUserBlockedList && !sendedUserBlockedList.includes(dto.from)) {
      this.log.debug('create -- this user has blocked you');
      throw new InternalServerErrorException();
    }

    const { mediaUrl, message } = dto;
    if (!mediaUrl && !message) {
      this.log.debug('create -- invalid argument(s)');
      throw new InternalServerErrorException();
    }

    const encryptedMessage = encrypt(message);
    if (!encryptedMessage) {
      this.log.error('create -- message could not encrypted');
      throw new InternalServerErrorException();
    }

    const entity = SaveMessageDto.toEntity(dto, encryptedMessage);
    const savedMessage = this.messageRepository.save(entity);
    if (!savedMessage) {
      this.log.error('create -- could not saved message');
      throw new InternalServerErrorException();
    }

    this.log.debug('create -- success');
    return savedMessage;
  }
}