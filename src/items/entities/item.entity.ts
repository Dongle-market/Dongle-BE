import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'item' })
export class Item {
  @PrimaryGeneratedColumn({ name: 'item_id' })
  itemId: number;

  @Column({ name: 'category_id' })
  categoryId: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  lprice: string;

  @Column({ nullable: true })
  hprice: string;

  @Column({ name: 'mall_name', nullable: true })
  mallName: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  count: number;
}