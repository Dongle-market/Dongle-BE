import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'pet' })
export class Pet {
  @PrimaryGeneratedColumn({ name: 'pet_id' })
  petId: number;

  @Column({ name: 'pet_name' })
  petName: string;

//   @Column({ name: 'profile_img', nullable: true })
//   profileImg: number;

  @Column({ name: 'type', nullable: true })
  type: string;

  @CreateDateColumn({ name: 'gender' })
  gender: boolean;

  @UpdateDateColumn({ name: 'age' })
  age: number;
}