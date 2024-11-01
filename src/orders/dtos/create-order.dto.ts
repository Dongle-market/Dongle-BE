import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsString, ValidateNested } from "class-validator";

class CreateOrderItemDto {
  @IsNotEmpty()
  @IsInt()
  readonly itemId: number;

  @IsNotEmpty()
  @IsInt()
  readonly itemCount: number;

  @IsNotEmpty()
  @IsInt()
  readonly price: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  readonly receiverName: string;

  @IsNotEmpty()
  @IsString()
  readonly addr: string;

  @IsNotEmpty()
  @IsString()
  readonly addrDetail: string;

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsInt()
  readonly totalPrice: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  readonly orderItems: CreateOrderItemDto[];
}