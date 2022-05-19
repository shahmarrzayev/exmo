import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericRepository } from '../../common/repository';
import { UserEntity } from './user.entity';
import { FindUsersFilterDto } from './dto/findUsersFilter.dto';

@Injectable()
export class UserRepository extends GenericRepository {
  constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {
    super();
  }

  async findAll(filter: FindUsersFilterDto): Promise<UserEntity[]> {
    return await this.runQuery(() =>
      this.repository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.roles', 'role')
        .leftJoinAndSelect('role.permissions', 'permission')
        .where(filter.email ? 'user.email = :email' : 'TRUE', { email: filter.email })
        .andWhere(filter.firstName ? 'user.firstName = :firstName' : 'TRUE', {
          firstName: filter.firstName,
        })
        .andWhere(filter.lastName ? 'user.lastName = :lastName' : 'TRUE', {
          lastName: filter.lastName,
        })
        .andWhere(filter.finCode ? 'user.finCode = :finCode' : 'TRUE', {
          finCode: filter.finCode,
        })
        .andWhere(filter.isActive ? 'user.isActive = :isActive' : 'TRUE', {
          isActive: filter.isActive,
        })
        .skip(this.getSkip(filter.page, filter.perPage))
        .take(filter.perPage || 10)
        .getMany(),
    );
  }

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
