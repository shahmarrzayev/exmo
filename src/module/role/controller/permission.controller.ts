import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PermissionService } from '../service/permission.service';
import { PermissionDto } from '../dto/permission.dto';
import { SavePermissionDto } from '../dto/savePermission.dto';

@Controller('/api/internal/permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  async create(@Body() dto: SavePermissionDto): Promise<PermissionDto> {
    const permission = await this.permissionService.create(dto);
    return PermissionDto.fromEntity(permission);
  }

  @Get()
  async getAll(): Promise<PermissionDto[]> {
    const permissions = await this.permissionService.getAll();
    return permissions.map(PermissionDto.fromEntity);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: SavePermissionDto): Promise<PermissionDto> {
    const permission = await this.permissionService.update(parseInt(id), dto);
    return PermissionDto.fromEntity(permission);
  }
}
