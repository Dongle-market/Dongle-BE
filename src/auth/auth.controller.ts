import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('apis/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async kakaoAuth(@Query("code") code: string) {
    const token = await this.authService.getKakaoToken(code);
    const user = await this.authService.getKakaoUserInfo(token);
    return {token, user};
  }
}
