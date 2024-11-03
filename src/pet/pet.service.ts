// pet.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
  ) {}

  /** 특정 유저의 반려동물 리스트 조회 */
  async getAllByUserId(userId: number): Promise<Pet[]> {
    return await this.petsRepository.find({ where: { user: { userId } } });
  }

  /** 특정 유저의 특정 반려동물 조회 */
  async getOneByUserId(userId: number, petId: number): Promise<Pet> {
    const pet = await this.petsRepository.findOne({
      where: { petId, user: { userId } },
    });
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${petId} for User ${userId} not found.`);
    }
    return pet;
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
