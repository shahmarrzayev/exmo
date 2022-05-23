import { Controller } from '@nestjs/common';
import { UserService } from '../user.service';

@Controller('/api/user/get-code')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
