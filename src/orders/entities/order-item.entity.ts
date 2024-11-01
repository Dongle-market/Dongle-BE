import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Item } from "src/items/entities/item.entity";

@Entity({ name: 'order_item' })
export class OrderItem {
  @PrimaryGeneratedColumn({ name: 'order_item_id' })
  orderItemId: number;

  @ManyToOne(() => Order, order => order.orderItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Item, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @Column({ name: 'item_count' })
  itemCount: number;

  @Column()
  price: number;
}