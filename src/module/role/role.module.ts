import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entity/role.entity';
import { RoleController } from './controller/role.controller';
import { PermissionController } from './controller/permission.controller';
import { RoleRepository } from './repository/role.repository';
import { RoleService } from './service/role.service';
import { PermissionRepository } from './repository/permission.repository';
import { PermissionService } from './service/permission.service';
import { PermissionEntity } from './entity/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, PermissionEntity])],
  controllers: [RoleController, PermissionController],
  providers: [RoleRepository, RoleService, PermissionRepository, PermissionService],
  exports: [RoleService],
})
export class RoleModule {}
