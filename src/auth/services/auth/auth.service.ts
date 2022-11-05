import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/utils/bcrypt';
import { UsersService } from '../../../users/services/users/users.service';

@Injectable()
export class AuthService {
    
    constructor(@Inject('USER_SERVICE')private readonly userService:UsersService,){}
    async validateUser(username: string, password: string){
        console.log('Inside validateUser');
        const userDB = await this.userService.findUserByUsername(username);
        if(userDB){
            const matched = comparePasswords(password, userDB.password);
            if(matched){
            console.log('User validation Success!');
            return userDB;
            }
             else{
              console.log('Password do not match!');
              return null;
        }
    }
        
        console.log('User validation Failed!');
        return null;
    
    }

    async test() {
        return 'INSIDE AUTH SERVICE';
    }
}
