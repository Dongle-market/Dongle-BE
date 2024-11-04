import { Request } from 'express';
import { OrdersService } from './orders.service';
import { Body, Controller, Get, Logger, Param, Patch, Post, Req } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { type } from 'os';
import { CreateOrderPetDto } from './dtos/create-order-pet.dto';
import { Public } from 'src/auth/public.decorator';

@Controller('apis/order')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService 
  ) {}

  private readonly logger = new Logger(OrdersController.name);

  /** 내 주문내역 */
  @Get('my')
  async getByUserId(@Req() req: Request): Promise<Order[]> {
    const userId = req['userId'];
    this.logger.log(`userId ${userId}번 주문내역 조회`);
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
    this.logger.log(`userId ${userId}번 주문생성`);
    return await this.ordersService.createOrder(userId, createData);
  }

  @Patch(':id')
  async updateOrderStatus(@Param('id') orderId: number, @Req() req: Request): Promise<Order> {
    const userId = req['userId'];
    this.logger.log(`userId ${userId}번 ${orderId}번 주문 결제 성공`);
    return await this.ordersService.updateOrderStatus(orderId);
  }

  @Post('pet')
  async addPetToOrder(@Body() createData: CreateOrderPetDto, @Req() req: Request): Promise<Order> {
    const userId = req['userId'];
    this.logger.log(`${userId}번 유저가 ${createData.orderId}번 주문에 ${createData.petId}번 펫 추가`);
    return await this.ordersService.addPetToOrder(createData);
  }
}
