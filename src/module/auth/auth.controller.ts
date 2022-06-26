import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../user/dto/user/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/input/login.dto';
import { SendVerificationCodeDto } from './dto/input/sendVerificationCode.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/send-code')
  async sendVerificationCode(
    @Body() dto: SendVerificationCodeDto,
  ): Promise<{ verificationCodeExpDate: Date; verificationCode: string }> {
    return await this.authService.sendVerificationCode(dto.phoneNumber);
  }

  @Post('/login')
  async login(@Body() dto: LoginDto): Promise<{ access_token: string; user: UserDto }> {
    return await this.authService.login(dto.phoneNumber, dto.verificationCode);
  }
}
