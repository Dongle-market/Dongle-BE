import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Controller('apis/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async kakaoAuth(@Query("code") code: string, @Res() res: Response) {
    const token = await this.authService.getKakaoToken(code);
    const user = await this.authService.getKakaoUserInfo(token);
    
    const redirectUrl = `http://localhost:3001/auth?token=${token}&user=${JSON.stringify(user)}`;
    res.redirect(redirectUrl)
  }

  @Post("login")
  async login(@Body() authCode: string) {
    const token = await this.authService.getKakaoToken(authCode);
    const user = await this.authService.getKakaoUserInfo(token);
    
    const existingUser = await this.usersService.getOneByKakaoId(user.id.toString());

    
    if (existingUser) {

    }
  }
}
