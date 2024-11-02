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

  /** 전체 반려동물 리스트 조회 */
  async getAll(): Promise<Pet[]> {
    return await this.petsRepository.find();
  }

  /** 특정 반려동물 정보 조회 */
  async getOne(id: number): Promise<Pet> {
    const pet = await this.petsRepository.findOne({ where: { petId: id } });
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found.`);
    }
    return pet;
  }

  /** 반려동물 등록 */
  async create(petData: CreatePetDto): Promise<Pet> {
    const newPet = this.petsRepository.create(petData);
    return await this.petsRepository.save(newPet);
  }

  /** 반려동물 정보 업데이트 */
  async update(id: number, updateData: UpdatePetDto): Promise<Pet> {
    await this.petsRepository.update(id, updateData);
    return this.getOne(id);
  }

  /** 반려동물 삭제 */
  async deleteOne(id: number): Promise<void> {
    const result = await this.petsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pet with ID ${id} not found.`);
    }
  }
}
