import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async getKakaoToken(code: string): Promise<string> {
    try {
      const tokenResponse = await firstValueFrom(
        this.httpService.post(
          `https://kauth.kakao.com/oauth/token`, null,
          {
            params: {
              grant_type: "authorization_code",
              client_id: process.env.KAKAO_CLIENT_ID,
              redirect_uri: process.env.KAKAO_REDIRECT_URI,
              code: code,
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
      );
      return tokenResponse.data.access_token;
    } catch (error) {
      console.error(error);
    }
  }

  async getKakaoUserInfo(token: string): Promise<any> {
    try {
      const userInfoResponse = await firstValueFrom(
        this.httpService.get(
          `https://kapi.kakao.com/v2/user/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
      );
      return userInfoResponse.data;
    } catch (error) {
      console.log("kakao error");
    }
  }

  async generateJwt(user: any): Promise<string> {
    const payload = {
      userId: user.userId,
      kakaoId: user.kakaoId,
    }
    return this.jwtService.sign(payload);
  }
}
