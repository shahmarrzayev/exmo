import { AuthHelper } from './auth.helper';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from '../role/service/role.service';
import { UserService } from '../user/user.service';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { getConfig } from '../../common/util';
import { EConfig } from '../../common/config.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly authHelper: AuthHelper,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async login(user: any): Promise<{ access_token: string }> {
    if (!user || !user.isActive) {
      this.logger.debug('login -- user is not active');
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, email: user.email, isActive: user.isActive };
    const accessToken = this.jwtService.sign(payload, {
      secret: getConfig(EConfig.DOCTORO_JWT_ACCESS_SECRET_KEY),
    });
    this.logger.debug('login -- success');
    return { access_token: accessToken };
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    this.logger.debug('validateUser -- start');
    if (!email || !password) {
      this.logger.warn('validateUser -- null param');
      throw new InternalServerErrorException();
    }

    let user: UserEntity;
    try {
      user = await this.userService.getByEmail(email);
    } catch (error) {
      return null;
    }

    const correctPassword = await this.authHelper.verifyPassword(user.password, password);
    if (!correctPassword) {
      this.logger.warn('validateUser -- wrong password');
      throw new UnauthorizedException('Wrong email or password');
    }
    this.logger.debug('validateUser -- success');
    return user;
  }
}
