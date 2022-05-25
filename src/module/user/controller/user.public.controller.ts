import { Body, Controller, Post, Logger } from '@nestjs/common';
import { SaveUserDto } from '../dto/saveUser.dto';
import { UserEntity } from '../user.entity';
import { UserService } from '../user.service';

@Controller('/api/user/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private readonly log = new Logger(UserService.name);

  @Post('update')
  async update(@Body() dto: SaveUserDto): Promise<UserEntity> {
    const user = this.userService.update(dto);
    return user;
  }
}
