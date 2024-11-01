import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>
  ) {}

  /** 내 주문내역 최신순 조회 */
  async getByUserId(userId: number): Promise<Order[]> {
    return await this.ordersRepository.find({ order: { orderDate: 'DESC' } });
  }

  /** 단일 주문 조회 */
  async getOne(orderId: number): Promise<Order> {
    return await this.ordersRepository.findOne({ where: { orderId: orderId } });
  }

  // async createOrder(orderData: CreateOrder)

}
