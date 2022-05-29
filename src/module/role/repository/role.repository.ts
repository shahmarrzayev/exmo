import { GenericRepository } from '../../../common/repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../entity/role.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRepository extends GenericRepository {
  constructor(@InjectRepository(RoleEntity) private repository: Repository<RoleEntity>) {
    super();
  }

  async findAll(): Promise<RoleEntity[]> {
    return await this.runQuery(() =>
      this.repository
        .createQueryBuilder('role')
        .leftJoinAndSelect('role.permissions', 'permission')
        .getMany(),
    );
  }

  async findById(id: number): Promise<RoleEntity> {
    if (id !== 0 && !id) return null;
    return await this.runQuery(() =>
      this.repository
        .createQueryBuilder('role')
        .leftJoinAndSelect('role.permissions', 'permission')
        .where('role.id = :id', { id })
        .getOne(),
    );
  }

  async findByIdsIn(ids: number[]): Promise<RoleEntity[]> {
    if (!ids || !ids.length) return [];
    return await this.runQuery(() =>
      this.repository.createQueryBuilder('role').whereInIds(ids).getMany(),
    );
  }

  async findByTitle(title: string): Promise<RoleEntity> {
    if (!title) return null;
    return await this.runQuery(() => this.repository.findOne({ where: { title } }));
  }

  async save(role: RoleEntity): Promise<RoleEntity> {
    if (!role) return null;
    return await this.runQuery(() => this.repository.save(role));
  }
}
