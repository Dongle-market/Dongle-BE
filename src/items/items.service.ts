import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  getAll(): Promise<Item[]> {
    return this.itemsRepository.find({ relations: ['category'] });
  }

  async getList(species: string): Promise<Item[]> {
    const result = await this.itemsRepository.createQueryBuilder('item')
      .innerJoinAndSelect('item.category', 'category')
      .where('category.species = :species', { species })
      .getMany();
    return result;
  }

  getOne(itemId: number): Promise<Item> {
    return this.itemsRepository.findOne({ where: { itemId }, relations: ['category'] });
  }
}
