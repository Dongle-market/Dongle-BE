import { IsNumber, IsOptional } from "class-validator";
import { CreateCartDto } from "./create-cart.dto";

export class UpdateCartDto extends CreateCartDto {
  @IsOptional()
  readonly itemId: number;

  @IsNumber()
  readonly itemCount: number;
}