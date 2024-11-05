import { IsInt, IsString, IsUrl, IsDateString } from 'class-validator';

export class PetOrderItemDto {
  @IsInt()
  itemId: number;

  @IsString()
  title: string;

  @IsUrl()
  image: string;

  @IsInt()
  price: number;

  @IsDateString()
  orderDate: string;
}