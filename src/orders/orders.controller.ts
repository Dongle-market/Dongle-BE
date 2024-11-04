import { Request } from 'express';
import { OrdersService } from './orders.service';
import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { type } from 'os';

@Controller('apis/order')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService 
  ) {}

  /** 내 주문내역 */
  @Get('my')
  async getByUserId(@Req() req: Request): Promise<Order[]> {
    const userId = req['userId'];
    return await this.ordersService.getByUserId(userId);
  }

  /** 단일주문 조회 */
  @Get(':id')
  async getOne(@Param('id') orderId: number): Promise<Order> {
    return await this.ordersService.getOne(orderId);
  }

  @Post()
  async createOrder(@Body() createData: CreateOrderDto, @Req() req: Request): Promise<Order> {
    const userId = req['userId'];
    return await this.ordersService.createOrder(userId, createData);
  }

  @Patch(':id')
  async updateOrderStatus(@Param('id') orderId: number): Promise<Order> {
    return await this.ordersService.updateOrderStatus(orderId);
  }
}
