import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  categoryId: number;

  @Column()
  species: string;

  @Column({ name: 'main_category' })
  mainCategory: string;

  @Column({ name: 'sub_category' })
  subCategory: string;
}