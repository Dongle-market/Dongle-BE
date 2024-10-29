import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {

  // 각 필드에 대한 유효성 검사 가능
  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @IsNotEmpty()
  @IsString()
  readonly kakaoId: string;

  @IsOptional()
  @IsString()
  readonly profilePic: string;

  @IsOptional()
  @IsString()
  readonly addr: string;

  @IsOptional()
  @IsString()
  readonly addrDetail: string;
}