import { IsEmail, IsNotEmpty,  MinLength } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    @MinLength(3)
    @IsEmail()
    username:string;
    @IsNotEmpty()
    @MinLength(10)
    password:string;
    @IsNotEmpty()
    name:string;
    @IsNotEmpty()
    contact:string;
    @IsNotEmpty()
    @MinLength(9)
    phone:string;
}