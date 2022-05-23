import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { getConfig } from '../../common/util';
import { EConfig } from '../../common/config.enum';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  private readonly logger = new Logger(AuthService.name);

  async login(phoneNumber: string): Promise<{ access_token: string }> {
    const user = await this.userService.getByPhone(phoneNumber);
    if (!user || !user.isActive) {
      this.logger.debug('login -- user is not active');
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, phoneNumber: user.phoneNumber, isActive: user.isActive };
    const accessToken = this.jwtService.sign(payload, {
      secret: getConfig(EConfig.DOCTORO_JWT_ACCESS_SECRET_KEY),
    });
    this.logger.debug('login -- success');
    return { access_token: accessToken };
  }

  // async validateUser(email: string, password: string): Promise<UserEntity> {
  //   this.logger.debug('validateUser -- start');
  //   if (!email || !password) {
  //     this.logger.warn('validateUser -- null param');
  //     throw new InternalServerErrorException();
  //   }

  //   let user: UserEntity;
  //   try {
  //     user = await this.userService.getByEmail(email);
  //   } catch (error) {
  //     return null;
  //   }

  //   const correctPassword = await this.authHelper.verifyPassword(user.password, password);
  //   if (!correctPassword) {
  //     this.logger.warn('validateUser -- wrong password');
  //     throw new UnauthorizedException('Wrong email or password');
  //   }
  //   this.logger.debug('validateUser -- success');
  //   return user;
  // }
}
