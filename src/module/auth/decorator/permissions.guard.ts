import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permission.decorator';
import { EPermission } from '../../role/enum/permission.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private readonly logger = new Logger(PermissionsGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.debug('canActivate -- start');
    const requiredPermissions = this.reflector.getAllAndOverride<EPermission[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      this.logger.debug('canActivate -- user object is empty');
      throw new ForbiddenException();
    }

    const userPermissions = user.roles.flatMap((r) => (r ? r.permissions : [])).map((p) => p.title);
    if (!userPermissions || !userPermissions.length) {
      this.logger.warn('canActive -- user does not have permissions');
      throw new ForbiddenException();
    }

    this.logger.debug('canActivate -- success');
    return userPermissions.some((r) => requiredPermissions.includes(r));
  }
}