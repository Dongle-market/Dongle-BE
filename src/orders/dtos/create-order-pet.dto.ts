import { IsInt, IsNotEmpty } from "class-validator";

export class CreateOrderPetDto {
  @IsNotEmpty()
  @IsInt()
  readonly orderItemId: number;

  @IsNotEmpty()
  @IsInt()
  readonly petId: number;
}