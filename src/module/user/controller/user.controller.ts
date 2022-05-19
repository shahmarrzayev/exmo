import { Body, Controller, Get, Param, Put, Req } from '@nestjs/common';
import { UserService } from '../user.service';
import { SaveUserDto } from '../dto/internal/saveUser.dto';

import { UserDto } from '../dto/user.dto';
import { FindUsersFilterDto } from '../dto/findUsersFilter.dto';
import { UserExtendedDto } from '../dto/internal/userExtended.dto';

@Controller('/api/internal/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(@Req() req): Promise<UserDto[]> {
    const users = await this.userService.getAll(FindUsersFilterDto.fromRequestParams(req.params));
    return users.map(UserDto.fromEntity);
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<UserExtendedDto> {
    const user = await this.userService.getById(parseInt(id));
    return UserExtendedDto.fromEntity(user);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: SaveUserDto): Promise<UserDto> {
    const user = await this.userService.update(parseInt(id), dto);
    return UserDto.fromEntity(user);
  }
}
