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

  async findById(id: number): Promise<ContactEntity> {
    if (!id) return null;
    return await this.runQuery(() =>
      this.repository.createQueryBuilder('contact').where('contact.id = :id', { id }).getOne(),
    );
  }

  async findManyByIds(ids: number[]): Promise<ContactEntity[]> {
    if (!ids || !ids.length) return null;
    return await this.runQuery(() => this.repository.findByIds(ids));
  }
}
