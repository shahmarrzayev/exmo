import { SaveContactDto } from './../dto/contact/saveContact.dto';
import { ContactDto } from './../dto/contact/contact.dto';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Permissions } from 'src/module/auth/decorator/permission.decorator';
import { IRequest } from 'src/module/auth/interfaces/request.interface';
import { EPermission } from 'src/module/role/enum/permission.enum';
import { ContactService } from '../service/contact.service';

@Controller('/api/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('/')
  @Permissions(EPermission.USER_WRITE)
  async create(@Req() req: IRequest, @Body() dto: SaveContactDto): Promise<ContactDto> {
    const contact = await this.contactService.save(dto, req.user);
    return ContactDto.fromEntity(contact);
  }

  @Get('/')
  @Permissions(EPermission.USER_READ)
  async get(@Req() req: IRequest): Promise<ContactDto> {
    const contact = await this.contactService.get(req.user);
    return ContactDto.fromEntity(contact);
  }
}
