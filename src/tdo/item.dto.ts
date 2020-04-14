import { IsString, IsNumber } from 'class-validator';

export class ItemDTO {
    @IsString()
    name: string;

    @IsNumber()
    number: number;
}