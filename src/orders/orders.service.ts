import { CreateOrderDto } from './dtos/create-order.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Item } from 'src/items/entities/item.entity';
import { Pet } from 'src/pets/entities/pet.entity';
import { CreateOrderPetDto } from './dtos/create-order-pet.dto';
import { OrderDto } from './dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
  ) {}

  /** 내 주문내역 최신순 조회 */
  async getByUserId(userId: number): Promise<OrderDto[]> {
    const orders = await this.ordersRepository.find({ 
      where: { userId: userId }, 
      order: { orderDate: 'DESC' },
      relations: ['orderItems.item', 'orderItems.pets'],
    });

    return orders.map(order => this.toOrderDto(order));
  }

  /** 단일 주문 조회 */
  async getOne(orderId: number): Promise<Order> {
    return await this.ordersRepository.findOne({ where: { orderId: orderId }, relations: ['orderItems', 'orderItems.item'] });
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

  /** 주문 - 펫 추가 */
  async addPetToOrderItem(createData: CreateOrderPetDto): Promise<OrderItem> {
    const { orderItemId, petId } = createData;

    const orderItem = await this.orderItemsRepository.findOne({ where: { orderItemId }, relations: ['pets'] });
    if (!orderItem) {
      throw new Error(`Order with ID ${orderItemId} not found`);
    }
    const pet = await this.petsRepository.findOne({ where: { petId } });
    if (!pet) {
      throw new Error(`Pet with ID ${petId} not found`);
    }

    orderItem.pets.push(pet);
    return await this.orderItemsRepository.save(orderItem);
  }

  async deleteOrder(orderId: number): Promise<number> {
    const result = await this.ordersRepository.delete({ orderId });
    return result.affected;
  }

  async deleteOrderItem(orderItemId: number): Promise<number> {
    const result = await this.orderItemsRepository.delete({ orderItemId });
    return result.affected;
  }

  private toOrderDto(order: Order): OrderDto {
    console.log(order);
    const orderItems = order.orderItems.map(orderItem => ({
      itemId: orderItem.item.itemId,
      title: orderItem.item.title,
      image: orderItem.item.image,
      price: orderItem.item.lprice,
      itemCount: orderItem.itemCount,
      pets: orderItem.pets && orderItem.pets.map(pet => pet.petId)
    }));

    return {
      orderId: order.orderId,
      userId: order.userId,
      orderDate: order.orderDate.toISOString(),
      totalPrice: order.totalPrice,
      status: order.status,
      receiverName: order.receiverName,
      addr: order.addr,
      addrDetail: order.addrDetail,
      phoneNumber: order.phoneNumber,
      orderItems,
    };
  }

}
