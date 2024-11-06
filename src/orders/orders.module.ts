import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Pet } from 'src/pets/entities/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Pet])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
