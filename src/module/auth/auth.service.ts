import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { getConfig } from '../../common/util';
import { EConfig } from '../../common/config.enum';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly authHelper: AuthHelper,
  ) {}

  private readonly log = new Logger(AuthService.name);

  async sendVerificationCode(phoneNumber: string): Promise<any> {
    this.log.debug('sendVerificationCode -- start');
    if (!phoneNumber) {
      this.log.debug('sendVerificationCode -- invalid argument(s)');
      throw new InternalServerErrorException();
    }

    const verificationCode = this.authHelper.generateCode();
    const verificationCodeExpDate = new Date(
      Date.now() + getConfig(EConfig.VERIFICATION_CODE_EXPIRATION_TIME) * 1000,
    );

    const savedUser = await this.userService.save(
      phoneNumber,
      verificationCode,
      verificationCodeExpDate,
    );
    if (!savedUser) {
      this.log.warn('sendVerificationCode -- could not save user');
      throw new InternalServerErrorException();
    }
    this.log.debug('sendVerificationCode -- success');
    return { verificationCodeExpDate };
  }

  async login(phoneNumber: string): Promise<{ access_token: string }> {
    const user = await this.userService.getByPhone(phoneNumber);
    if (!user || !user.isActive) {
      this.log.debug('login -- user is not active');
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, phoneNumber: user.phoneNumber, isActive: user.isActive };
    const accessToken = this.jwtService.sign(payload, {
      secret: getConfig(EConfig.DOCTORO_JWT_ACCESS_SECRET_KEY),
    });
    this.log.debug('login -- success');
    return { access_token: accessToken };
  }

  // async validateUser(email: string, password: string): Promise<UserEntity> {
  //   this.log.debug('validateUser -- start');
  //   if (!email || !password) {
  //     this.log.warn('validateUser -- null param');
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
  //     this.log.warn('validateUser -- wrong password');
  //     throw new UnauthorizedException('Wrong email or password');
  //   }
  //   this.log.debug('validateUser -- success');
  //   return user;
  // }
}
