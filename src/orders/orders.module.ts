import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Pet } from 'src/pets/entities/pet.entity';
import { CartsService } from 'src/carts/carts.service';
import { Cart } from 'src/carts/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Pet, Cart])],
  controllers: [OrdersController],
  providers: [OrdersService, CartsService],
})
export class OrdersModule {}
