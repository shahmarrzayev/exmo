import { SaveContactDto } from './../dto/contact/saveContact.dto';
import { ContactDto } from './../dto/contact/contact.dto';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { IRequest } from 'src/module/auth/interfaces/request.interface';
import { ContactService } from '../service/contact.service';

@Controller('/api/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('/')
  async save(@Req() req: IRequest, @Body() dto: SaveContactDto): Promise<ContactDto> {
    const contact = await this.contactService.save(dto, req.user);
    return ContactDto.fromEntity(contact);
  }

  @Get('/')
  async get(@Req() req: IRequest): Promise<ContactDto> {
    const contact = await this.contactService.get(req.user);
    return ContactDto.fromEntity(contact);
  }
}
