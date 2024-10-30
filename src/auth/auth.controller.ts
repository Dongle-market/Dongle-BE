import { Controller, Get, Query } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Get()
  async kakaoAuth(@Query("code") code: string) {
    console.log("code: ", code);
    return "kakaoAuth";
  }
}
