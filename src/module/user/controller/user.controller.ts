import { AddManyContactsDto } from '../dto/user/addManyContacts.dto';
import { UserDto } from './../dto/user/user.dto';
import { IRequest } from '../../auth/interfaces/request.interface';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { EPermission } from '../../role/enum/permission.enum';
import { SaveUserDto } from '../dto/user/saveUser.dto';
import { UserService } from '../service/user.service';

@Controller('/api/user/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get('/')
  // @Permissions(EPermission.USER_READ)
  // async get(@Req() req: IRequest): Promise<UserDto> {
  //   const user = await this.userService.get(req.user);
  //   return UserD  to.fromEntity(user);
  // }

  @Post('/')
  @Permissions(EPermission.USER_WRITE)
  async update(@Req() req: IRequest, @Body() dto: SaveUserDto): Promise<UserDto> {
    const user = await this.userService.update(req.user, dto);
    return UserDto.fromEntity(user);
  }

  @Post('/contacts')
  @Permissions(EPermission.USER_WRITE)
  async addManyContacts(@Req() req: IRequest, @Body() dto: AddManyContactsDto): Promise<UserDto> {
    const user = await this.userService.addManyContacts(req.user, dto);
    return UserDto.fromEntity(user);
  }
}
