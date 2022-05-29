import { GenericRepository } from '../../../common/repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from '../entity/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionRepository extends GenericRepository {
  constructor(
    @InjectRepository(PermissionEntity) private repository: Repository<PermissionEntity>,
  ) {
    super();
  }
  async findAll(): Promise<PermissionEntity[]> {
    return await this.runQuery(() => this.repository.find());
  }

  async findAllByIds(ids: number[]): Promise<PermissionEntity[]> {
    if (!ids || !ids.length) return null;
    return await this.runQuery(() => this.repository.findByIds(ids));
  }

  async findById(id: number): Promise<PermissionEntity> {
    if (!id) return null;
    return await this.runQuery(() => this.repository.findOne(id));
  }

  async findByTitle(title: string): Promise<PermissionEntity> {
    if (!title) return null;
    return await this.runQuery(() => this.repository.findOne({ where: { title } }));
  }

  async save(permission: PermissionEntity): Promise<PermissionEntity> {
    if (!permission) return null;
    return await this.runQuery(() => this.repository.save(permission));
  }
}
