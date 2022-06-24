import { IRequest } from './interfaces/request.interface';
import { AuthHelper } from './auth.helper';
import { ForbiddenException, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entity/user.entity';
import { getConfig } from '../../common/util';
import { EConfig } from '../../common/config.enum';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService, private readonly authHelper: AuthHelper) {}

  private readonly logger = new Logger(AuthMiddleware.name);

  async use(req: IRequest, res: Response, next: NextFunction) {
    this.logger.debug('use -- start');
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    if (!bearerHeader || !accessToken) {
      this.logger.warn('use -- no token');
      return next();
    }

    let user: UserEntity;
    try {
      const { id }: any = verify(accessToken, getConfig(EConfig.EXMO_JWT_ACCESS_SECRET_KEY));
      user = await this.userService.getById(id);
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw new ForbiddenException('Please register or sign in.');
    }

    if (user && user.isActive) {
      if (user.isUser) {
        user.roles = this.authHelper.userPermissions();
      }

      req.user = user;
    }
    this.logger.debug('use -- success');
    next();
  }
}
