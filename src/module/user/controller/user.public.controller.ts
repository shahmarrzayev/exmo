import { IRequest } from './../../auth/interfaces/request.interface';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Permissions } from 'src/module/auth/decorator/permission.decorator';
import { EPermission } from 'src/module/role/enum/permission.enum';
import { SaveUserDto } from '../dto/saveUser.dto';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../user.service';

@Controller('/api/user/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @Permissions(EPermission.USER_READ)
  async getProfile(@Req() req: IRequest): Promise<UserDto> {
    const user = await this.userService.getProfile(req.user);
    return UserDto.fromEntity(user);
  }

  @Post('/')
  @Permissions(EPermission.USER_WRITE)
  async update(@Body() dto: SaveUserDto): Promise<UserDto> {
    const user = await this.userService.update(dto);
    return UserDto.fromEntity(user);
  }
}
