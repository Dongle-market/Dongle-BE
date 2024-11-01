import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Item } from "src/items/entities/item.entity";

@Entity({ name: 'order_item' })
export class OrderItem {
  @PrimaryGeneratedColumn({ name: 'order_item_id' })
  orderItemId: number;

  @ManyToOne(() => Order, order => order.orderId, { onDelete: 'CASCADE' })
  @Column({ name: 'order_id' })
  order_id: number;

  @ManyToOne(() => Item, item => item.itemId, { onDelete: 'CASCADE' })
  @Column({ name: 'item_id' })
  itemId: number;

  @Column({ name: 'item_count' })
  itemCount: number;

  @Column()
  price: number;
}