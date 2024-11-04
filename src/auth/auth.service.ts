import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  /** 인가코드로 카카오 토큰 발급 */
  async getKakaoToken(code: string): Promise<string> {
    try {
      const tokenResponse = await firstValueFrom(
        this.httpService.post(
          `https://kauth.kakao.com/oauth/token`, null,
          {
            params: {
              grant_type: "authorization_code",
              client_id: this.config.get<string>('KAKAO_CLIENT_ID'),
              redirect_uri: this.config.get<string>('KAKAO_REDIRECT_URI'),
              code: code,
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
      );
      this.logger.log(`카카오 토큰 발급 완료`);
      return tokenResponse.data.access_token;
    } catch (error) {
      this.logger.error(`카카오 토큰 발급 실패`);
    }
  }

  /** 카카오 토큰으로 카카오 정보 취득 */
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
      this.logger.log(`카카오 유저정보 취득 완료`);
      return userInfoResponse.data;
    } catch (error) {
      this.logger.error(`카카오 유저정보 취득 실패`);
    }
  }

  /** JWT 토큰 발급 */
  async generateJwt(user: any): Promise<string> {
    const payload = {
      userId: user.userId,
      kakaoId: user.kakaoId,
    }
    return this.jwtService.sign(payload);
  }
}
