import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PermissionRepository } from '../repository/permission.repository';
import { SavePermissionDto } from '../dto/savePermission.dto';
import { PermissionEntity } from '../entity/permission.entity';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async create(dto: SavePermissionDto): Promise<PermissionEntity> {
    if (!dto) return null;

    if (await this.titleExists(dto.title)) {
      throw new ConflictException('Title already exists');
    }

    const permission = await this.permissionRepository.save(SavePermissionDto.toEntity(dto));
    if (!permission) {
      throw new InternalServerErrorException('Could not save permission');
    }

    return permission;
  }

  async getAll(): Promise<PermissionEntity[]> {
    return this.permissionRepository.findAll();
  }

  async update(id: number, dto: SavePermissionDto): Promise<PermissionEntity> {
    if (!dto) return null;

    const entity = await this.permissionRepository.findById(id);
    if (!entity) {
      throw new NotFoundException('Permission not found');
    }

    if (dto.title !== entity.title && (await this.titleExists(dto.title))) {
      throw new ConflictException('Title already exists');
    }

    let updatedEntity = { ...entity, ...SavePermissionDto.toEntity(dto) };

    updatedEntity = await this.permissionRepository.save(updatedEntity);
    if (!updatedEntity) {
      throw new InternalServerErrorException('Could not update permission');
    }

    return updatedEntity;
  }

  private async titleExists(title: string): Promise<boolean> {
    const titleExists = await this.permissionRepository.findByTitle(title);
    return !!titleExists;
  }
}
