import { IsNumber, IsString } from "class-validator";

export class UpdateUserDto {

  // 각 필드에 대한 유효성 검사 가능
  @IsString()
  readonly userName?: string;

  @IsString()
  readonly kakaoId?: string;

  @IsString()
  readonly profilePic?: string;

  @IsString()
  readonly addr?: string;

  @IsString()
  readonly addrDetail?: string;
}