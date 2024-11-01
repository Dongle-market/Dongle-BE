import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn({ name: 'order_id' })
  orderId: number;

  @ManyToOne(() => User, user => user.userId, { onDelete: 'CASCADE' })
  @Column({ name: 'user_id' })
  userId: number;

  @CreateDateColumn({ name: 'order_date' })
  orderDate: Date;

  @Column({ name: 'total_price' })
  totalPrice: number;

  @Column({ nullable: true })
  status: string;

  @Column({ name: 'receiver_name' })
  receiverName: string;

  @Column()
  addr: string;

  @Column({ name: 'addr_detail'})
  addrDetail: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

}