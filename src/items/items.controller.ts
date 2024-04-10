
// src/items/item.controller.ts
import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './items.entity';

@Controller('Item')
export class itemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() item: Item): Promise<Item> {
    return this.itemsService.create(item);
  }

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Item> {
    const condition = {id:id}
    return this.itemsService.findOne(condition);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() item: Item): Promise<Item> {
    let condition = {id: id}
    return this.itemsService.update(condition, item);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.itemsService.remove(id);
  }
}
