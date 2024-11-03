// pet.controller.ts

import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Req } from '@nestjs/common';
import { PetService } from './pet.service';
import { Pet } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('apis/pet')
export class PetController {
  constructor(private readonly petService: PetService) {} // dependency injection

  /** 전체 반려동물 리스트 */
  @Get('mydongle')
  async getAll(): Promise<Pet[]> {
    return this.petService.getAll();
  }

  /** 특정 반려동물 정보 */
  @Get(':id')
  async getOne(@Param('id') petId: number): Promise<Pet> {
    const pet = await this.petService.getOne(petId);
    if (!pet) {
      throw new NotFoundException(`해당 반려동물을 찾을 수 없습니다.`);
    }
    return pet;
  }

  /** 반려동물 등록 */
  @Post()
  async create(@Body() petData: CreatePetDto): Promise<Pet> {
    return await this.petService.create(petData);
  }

  /** 반려동물 삭제 */
  @Delete(':id')
  async remove(@Param('id') petId: number): Promise<void> {
    return this.petService.deleteOne(petId);
  }

  /** 반려동물 정보 업데이트 */
  @Patch(':id')
  async patch(@Param('id') petId: number, @Body() updateData: UpdatePetDto): Promise<Pet> {
    return this.petService.update(petId, updateData);
  }
}
