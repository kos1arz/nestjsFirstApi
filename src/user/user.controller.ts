import { Controller, Post, Get, Body, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from 'src/tdo/user.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';

@Controller('api/user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    showAllUsers(){
        return this.userService.showAll();
    }

    @Post('login')
    @UsePipes(new ValidationPipe)
    login(@Body() data: UserDTO) {
        return this.userService.login(data);
    }

    @Post('register')
    @UsePipes(new ValidationPipe)
    register(@Body() data: UserDTO) {
        return this.userService.register(data);
    }
}
