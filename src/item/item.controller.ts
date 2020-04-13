import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

import { ItemService } from './item.service';
import { ItemDTO } from 'src/tdo/item.dto';

@Controller('item')
export class ItemController {
    constructor(
        private readonly itemService: ItemService
    ){}

    @Get()
    showAllItems(){
        return this.itemService.showAll();
    }

    @Get(':id')
    showItemById(@Param('id') id: number){
        return this.itemService.showOne(id);
    }

    @Post()
    creatItem(@Body() data: ItemDTO){
        return this.itemService.create(data);
    }

    @Put(':id')
    updateItem(@Param('id') id: number, @Body() data: Partial<ItemDTO>){
        return this.itemService.updata(id, data);
    }

    @Delete(':id')
    deleteItem(@Param('id') id: number){
        return this.itemService.delete(id);
    }
}
