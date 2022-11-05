import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, NotFoundException, Param, Headers, ParseIntPipe, Post, UseFilters, UseInterceptors, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/typeorm';

import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dto/UpdateUserDto';

import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { SerializedUser } from 'src/users/types';
import { UsersService } from '../../services/users/users.service';
import {LocalStraetgy} from '../../../auth/utils/LocalStrategy';

@Controller('users')
export class UsersController {
    constructor(@Inject('USER_SERVICE')private readonly userService: UsersService,
    private readonly localStraetgy: LocalStraetgy){

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
    

    //add
    
    @Put('reset')
    updateUser( @Headers('authorization') header,@Body() updateUserDto: UpdateUserDto) {
      console.log(updateUserDto);
      console.log(header);
      console.log('Header: ',header);
      const authorizedData = this.localStraetgy.decodeJWTToken({ token: header });
      console.log('authorizedData: ',authorizedData);
      const updateUserBody={
        ...updateUserDto,
        ...authorizedData,
      }
      return this.userService.updateUser(updateUserBody);
   //return  `This action will update Userpassword `+this.userService.updateUser(updateUserDto);
  }


  //add 5/11/2565
  
    

}
