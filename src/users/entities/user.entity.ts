import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'kakao_id' })
  kakaoId: string;

  @Column({ name: 'profile_pic', nullable: true })
  profilePic: string;

  @Column({ nullable: true })
  addr: string;

  @Column({ name: 'addr_detail', nullable: true })
  addrDetail: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}