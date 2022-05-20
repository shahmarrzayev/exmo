import { Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard {
  constructor(private reflector: Reflector) {}

  private readonly logger = new Logger(PermissionsGuard.name);
}
