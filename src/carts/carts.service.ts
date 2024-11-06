import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dtos/create-cart.dto';
import { UpdateCartDto } from './dtos/update-cart.dto';

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

  async addToCart(userId: number, cartData: CreateCartDto): Promise<Cart> {
    const cart = this.cartsRepository.create({
      user: { userId },
      item: { itemId: cartData.itemId },
      itemCount: cartData.itemCount
    })
    return await this.cartsRepository.save(cart);
  }

  async updateCart(userId: number, cartId: number, itemCount: number): Promise<Cart> {
    const cart = await this.cartsRepository.findOne({
      where: { cartId: cartId, user: { userId } }
    })
    if (!cart) {
      return null;
    }
    cart.itemCount = itemCount;
    return await this.cartsRepository.save(cart);
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

}