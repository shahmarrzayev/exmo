import { Body, Controller, Post, Param } from '@nestjs/common';
import { SaveUserDto } from '../dto/saveUser.dto';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../user.service';

@Controller('/api/user/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/:id')
  async update(@Param('id') id: string, @Body() dto: SaveUserDto): Promise<UserDto> {
    console.log('birthdate -- ', dto);
    const user = await this.userService.update(parseInt(id), dto);
    return UserDto.fromEntity(user);
  }
}
