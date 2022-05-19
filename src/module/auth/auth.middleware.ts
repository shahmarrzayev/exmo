import { ForbiddenException, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { getConfig } from '../../common/util';
import { EConfig } from '../../common/config.enum';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new Logger(AuthMiddleware.name);

  async use(req: Request, res: Response, next: NextFunction) {
    this.logger.debug('use -- start');
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    if (!bearerHeader || !accessToken) {
      this.logger.warn('no token');
      return next();
    }

    let user: UserEntity;
    try {
      const { id }: any = verify(accessToken, getConfig(EConfig.DOCTORO_JWT_ACCESS_SECRET_KEY));
      user = await this.userService.getById(id);
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw new ForbiddenException('Please register or sign in.');
    }

    if (user && user.isActive) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      req.user = user;
    }

    this.logger.debug('use -- success');
    next();
  }
}