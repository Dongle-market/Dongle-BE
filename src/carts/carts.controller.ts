import { Body, Controller, Delete, Get, Logger, NotFoundException, Param, Patch, Post, Req } from '@nestjs/common';
import { CartsService } from './carts.service';
import { Request } from 'express';
import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dtos/create-cart.dto';
import { UpdateCartDto } from './dtos/update-cart.dto';

@Controller('apis/cart')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  private readonly logger = new Logger(CartsController.name);

  @Get()
  async getAllByUserId(@Req() req: Request): Promise<Cart[]> {
    const userId = req['userId'];
    return await this.cartsService.getAllByUserId(userId);
  }

  @Post()
  async addToCart(@Req() req: Request, @Body() cartData: CreateCartDto): Promise<Cart> {
    const userId = req['userId'];
    return await this.cartsService.addToCart(userId, cartData);
  }

  @Patch(':id')
  async updateCart(@Req() req: Request, @Param('id') cartId: number, @Body() cartData: UpdateCartDto): Promise<Cart> {
    const userId = req['userId'];
    this.logger.log(`userId ${userId}번의 장바구니 ${cartId}번 항목의 수량을 ${cartData.itemCount}로 수정`);
    return await this.cartsService.updateCart(userId, cartId, cartData.itemCount);
  }

  @Delete(':id')
  async removeCart(@Req() req: Request, @Param('id') cartId: number): Promise<{message: string}> {
    const userId = req['userId'];
    const affectedRows = await this.cartsService.deleteCart(userId, cartId);
    if (affectedRows === 0) {
      throw new NotFoundException('해당 장바구니 항목이 존재하지 않습니다.');
    } else {
      return { message: '장바구니 항목이 삭제되었습니다.' }
    }
  }
}
