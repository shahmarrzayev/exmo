import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericRepository } from '../../../common/repository';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserRepository extends GenericRepository {
  constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {
    super();
  }

  async findById(id: number): Promise<UserEntity> {
    if (!id) return null;
    return await this.runQuery(() =>
      this.repository.createQueryBuilder('user').where('user.id = :id', { id }).getOne(),
    );
  }

  async findByPhone(phoneNumber: string): Promise<UserEntity> {
    if (!phoneNumber) return null;
    return await this.runQuery(() =>
      this.repository
        .createQueryBuilder('user')
        .where('user.phone_number = :phoneNumber', { phoneNumber })
        .getOne(),
    );
  }

  async findWithContactByPhone(phoneNumber: string): Promise<UserEntity> {
    if (!phoneNumber) return null;
    return await this.runQuery(() =>
      this.repository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.contact', 'contact')
        .where('user.phone_number = :phoneNumber', { phoneNumber })
        .getOne(),
    );
  }

  async findByUsername(username: string): Promise<UserEntity> {
    if (!username) return null;
    return await this.runQuery(() =>
      this.repository
        .createQueryBuilder('user')
        .where('user.username = :username', { username })
        .getOne(),
    );
  }

  async save(entity: UserEntity): Promise<UserEntity> {
    if (!entity) return null;
    return await this.runQuery(() => this.repository.save(entity));
  }
}
