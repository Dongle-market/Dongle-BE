// pet.entity.ts

import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, RelationId, JoinTable } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Order } from "src/orders/entities/order.entity";

@Entity({ name: 'pet' })
export class Pet {
  @PrimaryGeneratedColumn({ name: 'pet_id' })
  petId: number;

  @Column({ name: 'pet_name' })
  petName: string;

  @Column({ name: 'profile_img', nullable: true })
  profileImg: number;

  @Column({ name: 'type', nullable: true })
  type: string;

  @Column({ name: 'gender' })
  gender: string;

  @Column({ name: 'age' })
  age: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) // 외래 키 컬럼 이름을 명시적으로 지정
  user: User;

  @RelationId((pet: Pet) => pet.user)
  @Column({ name: 'user_id' }) 
  userId: number;

  @ManyToMany(() => Order, order => order.pets)
  @JoinTable({
    name: 'order_pet',
    joinColumn: { name: 'pet_id', referencedColumnName: 'petId' },
    inverseJoinColumn: { name: 'order_id', referencedColumnName: 'orderId' }
  })
  orders: Order[];
}
