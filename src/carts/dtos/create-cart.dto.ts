import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsInt()
  readonly itemId: number;

  @IsNotEmpty()
  @IsInt()
  readonly itemCount: number;
}