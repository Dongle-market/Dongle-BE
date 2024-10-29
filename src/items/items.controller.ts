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

  @Get("list")
  async getList(@Query("species") species: string): Promise<Item[]> {
    return await this.itemsService.getList(species);
  }

  @Get(":id")
  getOne(@Param("id") itemId: number): Promise<Item> {
    return this.itemsService.getOne(itemId);
  }

}
