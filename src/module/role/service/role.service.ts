import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PermissionRepository } from '../repository/permission.repository';
import { RoleRepository } from '../repository/role.repository';
import { SaveRoleDto } from '../dto/saveRole.dto';
import { RoleEntity } from '../entity/role.entity';
import { PermissionEntity } from '../entity/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    private readonly permissionRepo: PermissionRepository,
    private readonly roleRepo: RoleRepository,
  ) {}

  async create(dto: SaveRoleDto): Promise<RoleEntity> {
    if (!dto) return null;

    if (await this.titleExists(dto.title)) {
      throw new ConflictException('Title already exists');
    }

    const entity = SaveRoleDto.toEntity(dto);
    entity.permissions = await this.getPermissions(dto.permissionIds);

    const role = await this.roleRepo.save(entity);
    if (!role) {
      throw new InternalServerErrorException('Could not save role');
    }

    return role;
  }

  async getAll(): Promise<RoleEntity[]> {
    return await this.roleRepo.findAll();
  }

  async getAllByIds(ids: number[]): Promise<RoleEntity[]> {
    if (!Array.isArray(ids) || !ids.length) return [];

    const roles = await this.roleRepo.findByIdsIn(ids);
    if (!roles || roles.length !== ids.length) {
      throw new NotFoundException('Role not found');
    }

    return roles;
  }

  async getByTitle(title: string): Promise<RoleEntity> {
    if (!title) return null;
    const role = await this.roleRepo.findByTitle(title);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async update(id: number, dto: SaveRoleDto): Promise<RoleEntity> {
    if (!dto) return null;

    const entity = await this.roleRepo.findById(id);
    if (!entity) {
      throw new NotFoundException('Role not found');
    }

    let updatedEntity = { ...entity, ...SaveRoleDto.toEntity(dto) };
    updatedEntity.permissions = await this.getPermissions(dto.permissionIds);

    updatedEntity = await this.roleRepo.save(updatedEntity);
    if (!updatedEntity) {
      throw new InternalServerErrorException('Could not update role');
    }

    return updatedEntity;
  }

  private async getPermissions(ids: number[]): Promise<PermissionEntity[]> {
    if (!Array.isArray(ids) || !ids.length) return [];

    const permissions = await this.permissionRepo.findAllByIds(ids);
    if (!permissions || permissions.length !== ids.length) {
      throw new NotFoundException('Permission not found');
    }

    return permissions;
  }

  private async titleExists(title: string): Promise<boolean> {
    const exists = await this.roleRepo.findByTitle(title);
    return !!exists;
  }
}
