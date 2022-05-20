import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../user.service';
import { SaveUserDto } from '../dto/public/saveUser.dto';

import { UserDto } from '../dto/public/user.dto';
import { PhoneNumberDto } from '../dto/public/phoneNumber.dto';

@Controller('/api/user/get-code')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async getCode(@Body() dto: PhoneNumberDto): Promise<UserDto> {
    const user = await this.userService.getCode(dto);
    return UserDto.fromEntity(user);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: SaveUserDto): Promise<UserDto> {
    const user = await this.userService.update(parseInt(id), dto);
    return UserDto.fromEntity(user);
  }
}
