// update-pet.dto.ts

import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdatePetDto {
  @IsString()
  @IsOptional() // optional 필드
  petName?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsBoolean()
  @IsOptional()
  gender?: boolean;

  @IsInt()
  @Min(0)
  @Max(30)
  @IsOptional()
  age?: number;
}
