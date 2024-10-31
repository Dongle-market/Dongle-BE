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

  // async getList(species: string): Promise<Item[]> {
  //   const result = await this.itemsRepository.createQueryBuilder('item')
  //     .innerJoinAndSelect('item.category', 'category')
  //     .where('category.species = :species', { species })
  //     .getMany();
  //   return result;
  // }

  /** 상품 리스트 조회 : 대분류 + 종/소분류 필터링 */
  async getList(main: string, species?: string, sub?: string): Promise<Item[]> {
    const query = this.itemsRepository.createQueryBuilder('item')
      .innerJoinAndSelect('item.category', 'category')
      .where('category.mainCategory = :mainCategory', { mainCategory: main })
    
    if (species) {
      query.andWhere('category.species = :species', { species });
    }
    if (sub) {
      query.andWhere('category.subCategory = :sub', { sub });
    }

    const result = await query.getMany();
    return result;
  }

  /** 상품 하나 조회 + 카테고리 */
  async getOne(itemId: number): Promise<Item> {
    return await this.itemsRepository.findOne({ where: { itemId }, relations: ['category'] });
  }
}
