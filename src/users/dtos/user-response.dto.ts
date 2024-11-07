import { IsInt, IsString } from "class-validator";

export class UserResponseDto {
  @IsInt()
  userId: number;

  @IsString()
  userName: string;

  @IsString()
  kakaoId: string;

  @IsString()
  profilePic: string;

  @IsString()
  addr: string;

  @IsString()
  addrDetail: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;

  @IsInt()
  petId: number | null;

  @IsInt()
  cartCount: number;
}