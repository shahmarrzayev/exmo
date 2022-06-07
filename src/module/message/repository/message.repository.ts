import { MessageEntity } from './../entity/message.entity';
import { GenericRepository } from './../../../common/repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageRepository extends GenericRepository {
  constructor(@InjectRepository(MessageEntity) private repository: Repository<MessageEntity>) {
    super();
  }
}
