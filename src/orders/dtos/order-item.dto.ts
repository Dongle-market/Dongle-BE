import { IsInt, IsString, IsUrl, IsOptional, IsArray } from 'class-validator';

export class OrderItemDto {
  @IsInt()
  itemId: number;

  @IsString()
  title: string;

  @IsUrl()
  image: string;

  @IsInt()
  price: number;

  @IsInt()
  itemCount: number;

  @IsArray()
  @IsInt({ each: true })
  pets: number[];
}