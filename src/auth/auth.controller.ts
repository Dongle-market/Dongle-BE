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
  async login(@Body() code: any) {
    const token = await this.authService.getKakaoToken(code.authCode);
    const user = await this.authService.getKakaoUserInfo(token);

    const existingUser = await this.usersService.getOneByKakaoId(user.id); // 신규유저면 undefined
    let jwtToken: string;
    let userData: any;
    
    if (existingUser) {
      jwtToken = await this.authService.generateJwt(existingUser);
      userData = existingUser;
    } else {
      const newUser = await this.usersService.create({
        kakaoId: user.id.toString(),
        userName: user.properties.nickname,
        profilePic: user.properties.profile_image,
      });
      jwtToken = await this.authService.generateJwt(newUser);
      userData = newUser;
    }

    return { token: jwtToken, user: userData };
  }
}
