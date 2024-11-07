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
  async getAllByUserId(@Req() req: Request): Promise<{carts: Cart[], cartCount: number}> {
    const userId = req['userId'];
    const carts = await this.cartsService.getAllByUserId(userId);
    const cartCount = carts.length;
    return { carts, cartCount };
  }

  @Post()
  async addToCart(@Req() req: Request, @Body() cartData: CreateCartDto): Promise<{cartId: number, itemCount: number, cartCount: number}> {
    const userId = req['userId'];
    const {cartId, itemCount} = await this.cartsService.addToCart(userId, cartData);
    const cartCount = await this.cartsService.getCartCount(userId);
    return { cartId, itemCount, cartCount };
  }

  @Patch(':id')
  async updateCart(@Req() req: Request, @Param('id') cartId: number, @Body() cartData: UpdateCartDto): Promise<Cart> {
    const userId = req['userId'];
    this.logger.log(`userId ${userId}번의 장바구니 ${cartId}번 항목의 수량을 ${cartData.itemCount}로 수정`);
    const result = await this.cartsService.updateCart(userId, cartId, cartData.itemCount);
    if (!result) {
      throw new NotFoundException('해당 장바구니 항목이 존재하지 않습니다.');
    } else {
      return result;
    }
  }

  @Delete(':id')
  async removeCart(@Req() req: Request, @Param('id') cartId: number): Promise<{message: string, cartCount: number}> {
    const userId = req['userId'];
    const affectedRows = await this.cartsService.deleteCart(userId, cartId);
    if (affectedRows === 0) {
      throw new NotFoundException('해당 장바구니 항목이 존재하지 않습니다.');
    } else {
      const cartCount = await this.cartsService.getCartCount(userId);
      return { message: '장바구니 항목이 삭제되었습니다.', cartCount };
    }
  }
}
