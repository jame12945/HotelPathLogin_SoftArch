import { IsEmail, IsNotEmpty,  MinLength } from "class-validator";

export class UpdateUserDto{
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
    @IsNotEmpty()
    oldPassword:string;
    @IsNotEmpty()
    newPassword:string;

}