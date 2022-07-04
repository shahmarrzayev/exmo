import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private readonly log = new Logger(AuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.log.debug('canActivate -- start');

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      this.log.debug('canActivate -- user object is empty');
      throw new ForbiddenException();
    }

    this.log.debug('canActivate -- success');
    return true;
  }
}
