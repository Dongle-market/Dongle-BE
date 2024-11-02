// create-pet.dto.ts

import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreatePetDto {
  @IsString()
  petName: string;

  @IsString()
  @IsOptional() // optional 필드
  type?: string;

  @IsBoolean()
  gender: boolean;

  @IsInt()
  @Min(0)
  @Max(30)
  age: number;
}
