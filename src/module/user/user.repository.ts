import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericRepository } from '../../common/repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends GenericRepository {
  constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {
    super();
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

  // not created

  async findExtendedById(id: number): Promise<UserEntity> {
    if (id !== 0 && !id) return null;
    return await this.runQuery(() =>
      this.repository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.organization', 'organization')
        .leftJoinAndSelect('user.roles', 'role')
        .leftJoinAndSelect('role.permissions', 'permission')
        .where('user.id = :id', { id })
        .getOne(),
    );
  }

  async findByEmail(email: string): Promise<UserEntity> {
    if (!email) return null;
    return await this.runQuery(() =>
      this.repository.createQueryBuilder('user').where('user.email = :email', { email }).getOne(),
    );
  }

  async findManyByOrganizationId(id: number): Promise<UserEntity[]> {
    if (id !== 0 && !id) return null;
    return await this.runQuery(() =>
      this.repository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.organization', 'organization')
        .where('organization.id = :id', { id })
        .getMany(),
    );
  }

  async save(entity: UserEntity): Promise<UserEntity> {
    if (!entity) return null;
    return await this.runQuery(() => this.repository.save(entity));
  }
}
