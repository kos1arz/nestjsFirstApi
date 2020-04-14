import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Item } from './item.entity';
import { ItemDTO } from 'src/tdo/item.dto';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private itemRepository: Repository<Item>
    ) {}

    async showAll(): Promise<any> {
        return await this.itemRepository.find();
    }

    async create(data: ItemDTO): Promise<any> {
        const item = await this.itemRepository.create(data);
        await this.itemRepository.save(item);
        return item;
    }

    async showOne(id: number): Promise<any> {
        const item = await this.itemRepository.findOne({ where: { id } });
        if (!item) {
            throw new HttpException(`Not found item by id ${id}`, HttpStatus.NOT_FOUND);
        }
        return item;
    }

    async updata(id: number, data: Partial<ItemDTO>): Promise<any> {
        const item = await this.itemRepository.findOne({ where: { id } });
        if (!item) {
            throw new HttpException(`Not found item by id: ${id}`, HttpStatus.NOT_FOUND);
        }
        await this.itemRepository.update({ id }, data);
        return item;
    }

    async delete(id: number): Promise<any> {
        const item = await this.itemRepository.findOne({ where: { id } });
        if (!item) {
            throw new HttpException(`Not found item by id: ${id}`, HttpStatus.NOT_FOUND);
        }
        await this.itemRepository.delete({ id });
        return { delete: true };
    }
}
