import { CreateOrderDto } from './dtos/create-order.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Item } from 'src/items/entities/item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
  ) {}

  /** 내 주문내역 최신순 조회 */
  async getByUserId(userId: number): Promise<Order[]> {
    return await this.ordersRepository.find({ where: { userId: userId }, order: { orderDate: 'DESC' } });
  }

  /** 단일 주문 조회 */
  async getOne(orderId: number): Promise<Order> {
    return await this.ordersRepository.findOne({ where: { orderId: orderId } });
  }

  /** userId, 주문DTO로 주문 생성 */
  async createOrder(id: number, orderData: CreateOrderDto): Promise<Order> {
    const { userId, receiverName, addr, addrDetail, phoneNumber, totalPrice, orderItems } = { userId: id, ...orderData };

    console.log({
      userId,
      receiverName,
      addr,
      addrDetail,
      phoneNumber,
      totalPrice,
      orderItems,
    })
    // order 테이블에 주문정보 저장
    const order = new Order();
    order.userId = userId;
    order.receiverName = receiverName;
    order.status = '결제중';
    order.addr = addr;
    order.addrDetail = addrDetail;
    order.phoneNumber = phoneNumber;
    order.totalPrice = totalPrice;
    const savedOrder = await this.ordersRepository.save(order);
    const savedOrderId = savedOrder.orderId;

    // orderItem 테이블에 주문상품정보 저장
    const items = orderItems.map(async itemDto => {
      const orderItem = new OrderItem();
      orderItem.orderId = savedOrderId;
      orderItem.itemId = itemDto.itemId;
      orderItem.itemCount = itemDto.itemCount;
      orderItem.price = itemDto.price;

      return await this.orderItemsRepository.save(orderItem);
    });

    await Promise.all(items);

    // TODO: 리턴할 dto 고려하기
    return savedOrder;
  }

  async updateOrderStatus(orderId: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { orderId: orderId } });
    order.status = '결제완료';
    return await this.ordersRepository.save(order);
  }

}
