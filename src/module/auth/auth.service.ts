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
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly authHelper: AuthHelper,
    @InjectTwilio() private readonly twilioClient: TwilioClient,
  ) {}

  private readonly log = new Logger(AuthService.name);

  async sendVerificationCode(
    phoneNumber: string,
  ): Promise<{ verificationCodeExpDate: Date; verificationCode: string }> {
    this.log.debug('sendVerificationCode -- start');
    if (!phoneNumber) {
      this.log.debug('sendVerificationCode -- invalid argument(s)');
      throw new InternalServerErrorException();
    }

    const verificationCode = this.authHelper.generateCode();
    try {
      await this.twilioClient.messages.create({
        body: `Your verification code: ${verificationCode}`,
        from: getConfig(EConfig.TWILIO_PHONE_NUMBER),
        to: phoneNumber,
      });
    } catch (err) {
      this.log.error(`${err}`);
      throw new InternalServerErrorException();
    }

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
    // verificationCode silinecek
    return { verificationCode, verificationCodeExpDate };
  }

  async login(phoneNumber: string, verificationCode: string): Promise<{ access_token: string }> {
    this.log.debug('login -- start');
    const user = await this.userService.getByPhone(phoneNumber);
    if (!user || !user.isActive) {
      this.log.debug('login -- user is not active');
      throw new UnauthorizedException();
    }

    const nowDate = new Date(Date.now());
    if (verificationCode != user.verificationCode || nowDate > user.verificationCodeExpDate) {
      this.log.debug('login -- verification code is not correct or has expired');
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, phoneNumber: user.phoneNumber, isActive: user.isActive };
    const accessToken = this.jwtService.sign(payload, {
      secret: getConfig(EConfig.EXMO_JWT_ACCESS_SECRET_KEY),
    });
    this.log.debug('login -- success');
    return { access_token: accessToken };
  }
}
