import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from 'src/common/repository';
import { Repository } from 'typeorm';
import { ContactEntity } from '../entity/contact.entity';

@Injectable()
export class ContactRepository extends GenericRepository {
  constructor(@InjectRepository(ContactEntity) private repository: Repository<ContactEntity>) {
    super();
  }

  async save(entity: ContactEntity): Promise<ContactEntity> {
    if (!entity) return null;
    return await this.runQuery(() => this.repository.save(entity));
  }

  async findByUserId(userId: number): Promise<ContactEntity> {
    if (!userId) return null;
    return await this.runQuery(() =>
      this.repository
        .createQueryBuilder('contact')
        .where('contact.user_id = :userId', { userId })
        .getOne(),
    );
  }
}
