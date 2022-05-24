import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SendVerificationCode } from './dto/sendVerificationCode.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async sendVerificationCode(@Body() dto: SendVerificationCode): Promise<AuthDto> {
    return await this.authService.sendVerificationCode(dto.phoneNumber);
  }
}
