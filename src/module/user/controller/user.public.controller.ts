import { Body, Controller, Post, Param } from '@nestjs/common';
import { Permissions } from 'src/module/auth/decorator/permission.decorator';
import { EPermission } from 'src/module/role/enum/permission.enum';
import { SaveUserDto } from '../dto/saveUser.dto';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../user.service';

@Controller('/api/user/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/:id')
  @Permissions(EPermission.USER_WRITE)
  async update(@Param('id') id: string, @Body() dto: SaveUserDto): Promise<UserDto> {
    const user = await this.userService.update(parseInt(id), dto);
    return UserDto.fromEntity(user);
  }
}
