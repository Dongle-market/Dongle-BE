// update-pet.dto.ts

import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdatePetDto {
  @IsString()
  @IsOptional()
  petName?: string;

  @IsInt()
  @IsOptional()
  profileImg?: number;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsInt()
  @Min(0)
  @Max(30)
  @IsOptional()
  age?: number;
}
