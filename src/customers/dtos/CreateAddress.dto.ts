import { IsNotEmpty } from "class-validator";

export class CreateAddressDto{
    @IsNotEmpty()
    line1:string;

    line2?:string;//can be empty string
    @IsNotEmpty()
    zip:string;
    @IsNotEmpty()
    city:string;
    @IsNotEmpty()
    state:string;
    
}