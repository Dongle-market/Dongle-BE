import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { In, Repository } from 'typeorm';
import { CreateCartDto } from './dtos/create-cart.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,
  ) {}

  async getAllByUserId(userId: number): Promise<Cart[]> {
    return await this.cartsRepository.find({
      where: { user: { userId }},
      relations: ['item']
    })
  }

  async getCartCount(userId: number): Promise<number> {
    const carts = await this.cartsRepository.find({
      where: { user: { userId }},
      relations: ['item']
    })
    return carts.length;
  }

  async addToCart(userId: number, cartData: CreateCartDto): Promise<{
    cartId: number, 
    itemCount: number,
  }> {
    const existingCart = await this.cartsRepository.findOne({
      where: { user: { userId }, item: { itemId: cartData.itemId } }
    })
    if (existingCart) {
      throw new ConflictException('이미 장바구니에 담긴 상품입니다.');
    }

    const cart = this.cartsRepository.create({
      user: { userId },
      item: { itemId: cartData.itemId },
      itemCount: cartData.itemCount
    });
    const result = await this.cartsRepository.save(cart);
    return { 
      cartId: result.cartId,
      itemCount: result.itemCount,
    }
  }

  async updateCart(userId: number, cartId: number, itemCount: number): Promise<Cart> {
    const cart = await this.cartsRepository.findOne({
      where: { cartId: cartId, user: { userId } }
    })
    if (!cart) {
      return null;
    } else if (itemCount === 0) {
      throw new ConflictException('수량은 0이 될 수 없습니다.');
    }
    cart.itemCount = itemCount;
    return await this.cartsRepository.save(cart);
  }

  async deleteAllCarts(userId: number): Promise<number> {
    const carts = await this.cartsRepository.find({
      where: { user: { userId } }
    })
    if (carts.length === 0) {
      return 0;
    }
    const result = await this.cartsRepository.delete(carts.map(cart => cart.cartId));
    return result.affected;
  }

  async deleteCart(userId: number, cartId: number): Promise<number> {
    const cart = await this.cartsRepository.findOne({
      where: { cartId: cartId, user: { userId } }
    })
    if (!cart) {
      return 0;
    }
    const result = await this.cartsRepository.delete(cart);
    return result.affected;
  }

  async deleteCartsByItemIds(userId: number, itemIds: number[]): Promise<void> {
    await this.cartsRepository.delete({
      user: { userId },
      item: In(itemIds),
    })
  }
}
