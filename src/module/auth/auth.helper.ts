import { EPermission } from '../role/enum/permission.enum';
import { RoleEntity } from './../role/entity/role.entity';
import { Injectable, Logger } from '@nestjs/common';
import { verify } from 'argon2';
import { ERole } from '../role/enum/role.enum';
import { PermissionEntity } from '../role/entity/permission.entity';

@Injectable()
export class AuthHelper {
  private readonly logger = new Logger(AuthHelper.name);

  async verifyPassword(hash: string, password: string): Promise<boolean> {
    this.logger.debug('verifyPassword -- start');
    if (!hash || !password) {
      return false;
    }

    let isCorrectPassword = false;
    try {
      isCorrectPassword = await verify(hash, password);
    } catch (error) {
      this.logger.error(`verifyPassword -- ${error}`);
      return false;
    }

    this.logger.debug('verifyPassword -- success');
    return isCorrectPassword;
  }

  userPermissions(): RoleEntity[] {
    const userRole = new RoleEntity();
    const firstPermission = new PermissionEntity();
    const secondPermission = new PermissionEntity();

    userRole.title = ERole.USER;
    firstPermission.title = EPermission.USER_READ;
    secondPermission.title = EPermission.USER_WRITE;

    userRole.permissions = [firstPermission, secondPermission];
    return [userRole];
  }

  generateCode(): string {
    return Math.floor(Math.random() * (1e6 - 111111) + 111111).toString();
  }
}
