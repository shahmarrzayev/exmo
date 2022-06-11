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

  async save(entity: MessageEntity): Promise<MessageEntity> {
    if (!entity) return null;
    return await this.runQuery(() => this.repository.save(entity));
  }

  async findById(id: string): Promise<MessageEntity> {
    if (!id) return null;
    return await this.runQuery(() =>
      this.repository.createQueryBuilder('message').where('message.id = :id', { id }).getOne(),
    );
  }
}
