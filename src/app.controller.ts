import { Controller, Get } from '@nestjs/common';

@Controller('/')
export default class AppController {
  @Get('/')
  get() {
    return '<h1>Hello World</h1>';
  }
}
