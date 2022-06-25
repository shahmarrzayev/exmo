import { Body, Controller, Post, Req } from '@nestjs/common';
import { Permissions } from 'src/module/auth/decorator/permission.decorator';
import { IRequest } from 'src/module/auth/interfaces/request.interface';
import { EPermission } from 'src/module/role/enum/permission.enum';
import { ContactDto } from '../dto/contact.dto';
import { SaveContactDto } from '../dto/saveContact.dto';
import { ContactService } from '../service/contact.service';

@Controller('/api/user-contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('/')
  @Permissions(EPermission.USER_WRITE)
  async create(@Req() req: IRequest, @Body() dto: SaveContactDto): Promise<ContactDto> {
    const contact = await this.contactService.save(dto, req.user);
    return ContactDto.fromEntity(contact);
  }
}
