import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

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
      return "카카오 토큰 발급 실패!"
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
      return "카카오 유저 정보 조회 실패!"
    }

  }
}
