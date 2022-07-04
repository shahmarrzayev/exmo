import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RoleService } from '../service/role.service';
import { SaveRoleDto } from '../dto/saveRole.dto';
import { RoleDto } from '../dto/role.dto';

@Controller('/api/internal/roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() dto: SaveRoleDto): Promise<RoleDto> {
    const role = await this.roleService.create(dto);
    return RoleDto.fromEntity(role);
  }

  @Get()
  async getAll(): Promise<RoleDto[]> {
    const roles = await this.roleService.getAll();
    return roles.map(RoleDto.fromEntity);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: SaveRoleDto): Promise<RoleDto> {
    const role = await this.roleService.update(parseInt(id), dto);
    return RoleDto.fromEntity(role);
  }
}
