import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {User as UserEntity} from '../../../typeorm';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { SerializedUser, User } from '../../types';
import { Repository } from 'typeorm';
import { comparePasswords, encodePassword } from 'src/utils/bcrypt';
import { UpdateUserDto } from 'src/users/dto/UpdateUserDto';





@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity)private readonly userRepository: Repository<UserEntity>){

    }
    private users:User[]=[];
    getUsers(){
        return this.users.map((user) => new SerializedUser(user));
    }
    getUsersByUsername(username:string){
        return this.users.find(user => user.username === username);
   }
   getUserById(id:number){
    return this.users.find(user => user.id === id);
   }
   createUser(createUserDto:CreateUserDto){
      const password = encodePassword(createUserDto.password); 
      console.log(password);
      const newUser = this.userRepository.create({...createUserDto,password});
      return this.userRepository.save(newUser);
   }
   async updateUser(body :UpdateUserDto){
    // const newUser = this.userRepository.create({...updateUserDto});
    // this.userRepository.update({})
    // const test = this.userRepository.update();
    // const testUpdate = this.userRepository.update();
    // const test = await this.userRepository.findOneBy({username: 'test'});
    const beforeEncrypt = 'Elephant12345678';
    const afterEncrypt = encodePassword(beforeEncrypt);
    console.log("this is beforeEncrypt");
    console.log(beforeEncrypt);
    console.log("this is afterEncrypt");
    console.log(afterEncrypt);

    const test = comparePasswords(beforeEncrypt, afterEncrypt);
    console.log("this is test");
    console.log(test);

    const { username, oldPassword, newPassword } = body;
    // const isValid = comparePasswords('Elephant12345678', '$2b$10$ZsHMvc3Q2SGTv7PkFckUSuQFAw.IoouujQLLlmRQMtEvC9OgKNQUC');
    // console.log("this is isValid");
    // console.log(isValid);
    // const oldPasswordEncrypt = encodePassword(oldPassword);//add

    
    const validateUserAccount = await this.userRepository.findOneBy({
        username,
    });
    
    
    // console.log("this is afterEncrypt oldPassword");
    

    console.log('validateUserAccount...');
    console.log(validateUserAccount);

    const userPasswordFromDB = validateUserAccount?.password;

    console.log({userPasswordFromDB});

    if (!userPasswordFromDB) return { success: false };
    
    const validatedUserAccount = comparePasswords(oldPassword,userPasswordFromDB);

    if(!validatedUserAccount) return { success: false };
    
    const newPasswordHashed = encodePassword(newPassword);

    await this.userRepository.update({username}, {
        password: newPasswordHashed ,
    });

    return {success: true};

   }
   

    
   findUserByUsername(username:string){
    return this.userRepository.findOneBy({username});
   }
}
