import { Controller, Get } from '@nestjs/common';

@Controller('apis')
export class AppController {
  @Get()
  home() {
    return "Welcome to Dongle API";
  }
}
