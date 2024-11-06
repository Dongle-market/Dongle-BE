import { Request } from 'express';
import { OrdersService } from './orders.service';
import { Body, Controller, Delete, Get, Logger, NotFoundException, Param, Patch, Post, Req } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { type } from 'os';
import { CreateOrderPetDto } from './dtos/create-order-pet.dto';
import { Public } from 'src/auth/public.decorator';
import { OrderItem } from './entities/order-item.entity';
import { OrderDto } from './dtos/order.dto';

@Controller('apis/order')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService 
  ) {}

  private readonly logger = new Logger(OrdersController.name);

  /** 내 주문내역 */
  @Get('my')
  async getByUserId(@Req() req: Request): Promise<OrderDto[]> {
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
  async addPetToOrder(@Body() createData: CreateOrderPetDto, @Req() req: Request): Promise<OrderItem> {
    const userId = req['userId'];
    this.logger.log(`${userId}번 유저가 ${createData.orderItemId}번 주문에 ${createData.petId}번 펫 추가`);
    return await this.ordersService.addPetToOrderItem(createData);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') orderId: number, @Req() req: Request): Promise<{message: string}> {
    const userId = req['userId'];
    this.logger.log(`${userId}번 유저가 ${orderId}번 주문 취소`);
    const affectedRows = await this.ordersService.deleteOrder(orderId);
    if (affectedRows === 0) {
      throw new NotFoundException('해당 주문이 존재하지 않습니다.');
    } else {
      return { message: '주문이 취소되었습니다.' }
    }
  }

  @Delete('item/:id')
  async deleteOrderItem(@Param('id') orderItemId: number, @Req() req: Request): Promise<{message: string}> {
    const userId = req['userId'];
    this.logger.log(`${userId}번 유저가 ${orderItemId}번 주문항목 삭제`);
    const affectedRows = await this.ordersService.deleteOrderItem(orderItemId);
    if (affectedRows === 0) {
      throw new NotFoundException('해당 주문항목이 존재하지 않습니다.');
    } else {
      return { message: '주문항목이 삭제되었습니다.' }
    }
  }
}
