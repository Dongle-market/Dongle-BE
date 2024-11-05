// pet.controller.ts

import { Body, Controller, Delete, Get, Headers, Logger, Param, Post, Req } from '@nestjs/common';
import { PetService } from './pet.service';
import { Pet } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Public } from 'src/auth/public.decorator';
import { PetOrderItemDto } from './dto/order-item-pet.dto';

@Controller('apis/pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  private readonly logger = new Logger(PetController.name);

  /** 특정 유저의 반려동물 리스트 */
  @Get('my')
  async getAll(@Req() req: Request): Promise<Pet[]> {
    const userId = req['userId'];
    this.logger.log(`userId ${userId}번 반려동물 리스트 조회`);
    return this.petService.getAllByUserId(userId);
  }

  /** 특정 반려동물 정보 + 주문내역 */
  @Get(':id')
  async getOne(@Param('id') petId: number): Promise<{pet: Pet, orderItems: PetOrderItemDto[]}> {
    return this.petService.getPetOrderItems(petId);
  }

  /** 특정 유저의 반려동물 등록 */
  @Post()
  async create(@Req() req: Request, @Body() petData: CreatePetDto): Promise<Pet> {
    const userId = req['userId'];
    return await this.petService.create(userId, petData);
  }

  /** 특정 유저의 반려동물 삭제 */
  @Delete(':id')
  async remove(@Req() req: Request, @Param('id') petId: number): Promise<void> {
    const userId = req['userId'];
    return this.petService.deleteOneByUserId(userId, petId);
  }
}
