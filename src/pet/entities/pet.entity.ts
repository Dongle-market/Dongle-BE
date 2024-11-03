import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'pet' })
export class Pet {
  @PrimaryGeneratedColumn({ name: 'pet_id' })
  petId: number;

  @Column({ name: 'pet_name' })
  petName: string;

  // @Column({ name: 'profile_img' })
  // profileImg: number;

  @Column({ name: 'type' })
  type: string;

  @Column({ name: 'gender' })
  gender: string;

  @Column({ name: 'age' })
  age: number;
}