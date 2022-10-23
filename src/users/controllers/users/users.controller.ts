import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, NotFoundException, Param, Headers, ParseIntPipe, Post, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { SerializedUser } from 'src/users/types';
import { UsersService } from '../../services/users/users.service';


@Controller('users')
export class UsersController {
    constructor(@Inject('USER_SERVICE')private readonly userService: UsersService,){

    }
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('')
    getUsers(){
           return this.userService.getUsers();
    }
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/username/:username')
    getByUsername(@Param('username')username:string){
        const user = this.userService.getUsersByUsername(username);
        if(user)return new SerializedUser(user);
    }
    @UseInterceptors(ClassSerializerInterceptor)
    @UseFilters(HttpExceptionFilter)
    @Get('id/:id') 
    getById( @Param('id',ParseIntPipe) id:number){
        const user = this.userService.getUserById(id);
        if(user)return new SerializedUser(user);
        else{
            throw new UserNotFoundException();
        }
       
    }
    @Post('create')
    @UsePipes(ValidationPipe)
    createUser(@Body ()createUserDto: CreateUserDto){
       return this.userService.createUser(createUserDto);
    }
}
