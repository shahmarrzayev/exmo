import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('login')
  // async login(@Body() dto: LoginDto): Promise<{ access_token: string }> {
  //   const user = await this.authService.validateUser(dto.email, dto.password);
  //   return this.authService.login(user);
  // }
}
