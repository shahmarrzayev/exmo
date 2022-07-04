import { AddManyContactsDto } from '../dto/user/addManyContacts.dto';
import { UserDto } from './../dto/user/user.dto';
import { IRequest } from '../../auth/interfaces/request.interface';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SaveUserDto } from '../dto/user/saveUser.dto';
import { UserService } from '../service/user.service';
import { AuthGuard } from 'src/module/auth/guard/auth.guard';

@Controller('/api/user/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  async update(@Req() req: IRequest, @Body() dto: SaveUserDto): Promise<UserDto> {
    const user = await this.userService.update(req.user, dto);
    return UserDto.fromEntity(user);
  }

  @Post('/contacts')
  @UseGuards(AuthGuard)
  async addManyContacts(@Req() req: IRequest, @Body() dto: AddManyContactsDto): Promise<UserDto> {
    const user = await this.userService.addManyContacts(req.user, dto);
    return UserDto.fromEntity(user);
  }
}
