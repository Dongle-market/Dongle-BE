import { Controller, Get } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {

  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  getAll(): Promise<Item[]> {
    return this.itemsService.getAll();
  }

}
