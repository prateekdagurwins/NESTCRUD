import { Injectable } from '@nestjs/common';
import { ObjectId } from 'typeorm';
// src/items/item.service.ts
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './items.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  async create(item: Item): Promise<Item> {
    return await this.itemsRepository.save(item);
  }

  async findAll(): Promise<Item[]> {
    return await this.itemsRepository.find();
  }

 async findOne(condition = {}): Promise<Item | undefined> {
  return await this.itemsRepository.findOne(condition);
 }

async update(condition={}, item: Item): Promise<Item | undefined> {
  await this.itemsRepository.update(condition, item);
  return await this.itemsRepository.findOne(condition);
}

async remove(id: string): Promise<void> {
   await this.itemsRepository.delete(id);
}
}

