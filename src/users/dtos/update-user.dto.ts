import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  readonly addr: string;

  @IsOptional()
  @IsString()
  readonly addrDetail: string;

  @IsOptional()
  @IsString()
  readonly phoneNumber: string;
} 