import { IsInt, IsNotEmpty } from "class-validator";

export class CreateOrderPetDto {
  @IsNotEmpty()
  @IsInt()
  readonly orderId: number;

  @IsNotEmpty()
  @IsInt()
  readonly petId: number;
}