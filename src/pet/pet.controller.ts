// pet.controller.ts

import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { PetService } from './pet.service';
import { Pet } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('apis/:userId/pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  /** 특정 유저의 반려동물 리스트 */
  @Get('mydongle')
  async getAll(@Param('userId') userId: number): Promise<Pet[]> {
    return this.petService.getAllByUserId(userId);
  }

  /** 특정 유저의 특정 반려동물 정보 */
  @Get(':id')
  async getOne(@Param('userId') userId: number, @Param('id') petId: number): Promise<Pet> {
    return this.petService.getOneByUserId(userId, petId);
  }

  /** 특정 유저의 반려동물 등록 */
  @Post()
  async create(@Param('userId') userId: number, @Body() petData: CreatePetDto): Promise<Pet> {
    return await this.petService.create(userId, petData);
  }

  /** 특정 유저의 반려동물 삭제 */
  @Delete(':id')
  async remove(@Param('userId') userId: number, @Param('id') petId: number): Promise<void> {
    return this.petService.deleteOneByUserId(userId, petId);
  }
}
