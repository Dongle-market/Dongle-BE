import { Controller, Get, Param, Query } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';

@Controller('apis/item')
export class ItemsController {

  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  getAll(): Promise<Item[]> {
    return this.itemsService.getAll();
  }

  // @Get("list")
  // async getList(@Query("species") species: string): Promise<Item[]> {
  //   return await this.itemsService.getList(species);
  // }

  /** 사료 조회 */
  @Get("food")
  async getFood(@Query("species") species?: string, @Query("sub") sub?: string, @Query("order") order?: string): Promise<Item[]> {
    return await this.itemsService.getList("food", species, sub, order);
  }

  /** 간식 조회 */
  @Get("snack")
  async getSnack(@Query("species") species?: string, @Query("sub") sub?: string, @Query("order") order?: string): Promise<Item[]> {
    return await this.itemsService.getList("snack", species, sub, order);
  }

  /** 용품 조회 */
  @Get("product")
  async getProduct(@Query("species") species?: string, @Query("sub") sub?: string, @Query("order") order?: string): Promise<Item[]> {
    return await this.itemsService.getList("product", species, sub, order);
  }

  /** id로 단일 상품 조회 */
  @Get(":id")
  async getOne(@Param("id") itemId: number): Promise<Item> {
    return this.itemsService.getOne(itemId);
  }

}
