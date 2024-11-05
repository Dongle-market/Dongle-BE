// pet.service.ts

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { OrderItem } from 'src/orders/entities/order-item.entity';
import { PetOrderItemDto } from './dto/order-item-pet.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
  ) {}

  private readonly logger = new Logger(PetService.name);

  /** 특정 유저의 반려동물 리스트 조회 */
  async getAllByUserId(userId: number): Promise<Pet[]> {
    return await this.petsRepository.find({ where: { userId: userId } });
  }

  /** 특정 유저의 특정 반려동물 조회 */
  // async getOneByUserId(userId: number, petId: number): Promise<Pet> {
  //   const pet = await this.petsRepository.findOne({
  //     where: { petId }, 
  //     relations: [ 'orderItems', 'orderItems.item' ],
  //   });
  //   if (!pet) {
  //     throw new NotFoundException(`Pet with ID ${petId} for User ${userId} not found.`);
  //   }
  //   return pet;
  // }

  /** 특정 반려동물의 주문 아이템과 관련된 상품 정보 조회 */
  async getPetOrderItems(petId: number): Promise<{pet: Pet, orderItems: PetOrderItemDto[]}> {
    const pet = await this.petsRepository.findOne({ where: { petId } });
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${petId} not found.`);
    }

    const query = this.orderItemsRepository.createQueryBuilder('oi')
      .innerJoin('oi.pets', 'pet', 'pet.pet_id = :petId', { petId })
      .innerJoin('oi.order', 'o')
      .innerJoin('oi.item', 'i')
      .select([
        'i.item_id AS itemId',
        'i.title AS title',
        'i.image AS image',
        'i.lprice AS price',
        'o.order_date AS orderDate',
      ]);

    const orderItems = await query.getRawMany();
    return { pet, orderItems };
  }

  /** 특정 유저의 반려동물 등록 */
  async create(userId: number, petData: CreatePetDto): Promise<Pet> {
    const newPet = this.petsRepository.create({ ...petData, user: { userId } });
    return await this.petsRepository.save(newPet);
  }

  /** 특정 유저의 반려동물 삭제 */
  async deleteOneByUserId(userId: number, petId: number): Promise<void> {
    const result = await this.petsRepository.delete({ petId, user: { userId } });
    if (result.affected === 0) {
      throw new NotFoundException(`Pet with ID ${petId} for User ${userId} not found.`);
    }
  }
}
