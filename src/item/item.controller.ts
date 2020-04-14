import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes } from '@nestjs/common';

import { ItemService } from './item.service';
import { ItemDTO } from 'src/tdo/item.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';

@Controller('api/item')
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
    @UsePipes(new ValidationPipe())
    creatItem(@Body() data: ItemDTO){
        return this.itemService.create(data);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    updateItem(@Param('id') id: number, @Body() data: Partial<ItemDTO>){
        return this.itemService.updata(id, data);
    }

    @Delete(':id')
    deleteItem(@Param('id') id: number){
        return this.itemService.delete(id);
    }
}
