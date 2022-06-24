import { IRequest } from '../../auth/interfaces/request.interface';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { EPermission } from '../../role/enum/permission.enum';
import { SaveUserDto } from '../dto/saveUser.dto';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../user.service';

@Controller('/api/user/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get('/')
  // @Permissions(EPermission.USER_READ)
  // async get(@Req() req: IRequest): Promise<UserDto> {
  //   const user = await this.userService.get(req.user);
  //   return UserDto.fromEntity(user);
  // }

  @Post('/')
  @Permissions(EPermission.USER_WRITE)
  async update(@Req() req: IRequest, @Body() dto: SaveUserDto): Promise<UserDto> {
    const user = await this.userService.update(req.user, dto);
    return UserDto.fromEntity(user);
  }
}
