import { Inject, Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth/auth.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LocalStraetgy extends PassportStrategy(Strategy){
    constructor(
        @Inject('AUTH_SERVICE')private readonly authService:AuthService,
        private readonly jwtService:JwtService,
    ) {
        super();
    }
    async validate(username:string,password:string){
        console.log('Inside LocalStrategy.validate');
        console.log(username);
        console.log(password);

        const payload = {
            username,
            password,
        }

        const jwtToken = this.jwtService.sign(payload, {expiresIn: '9999 years'});
        console.log({jwtToken});

        const user = await this.authService.validateUser(username,password);
        
        if(!user){
            throw new UnauthorizedException();
        }

        console.log( {
            ...user,
            jwtToken,
        })

        return {
            ...user,
            jwtToken,
        }
    }

    decodeJWTToken({ token }: { token:string}): any {
        console.log('Inside LocalStrategy.decodeJWTToken');
        // console.log('token...');
        // console.log(token);

        // return true;
        const tokenToBeUsed = token.replace('Bearer ', '');

        console.log('tokenToBeUsed...');
        console.log(tokenToBeUsed);

        console.log(this.jwtService.decode(tokenToBeUsed));
        return this.jwtService.decode(tokenToBeUsed);
    }

    mockRoomBooking({payload}) {
        console.log('Inside LocalStrategy mockRoomBooking');
        console.log(payload);
        const {username, message } = payload;
        console.log( {username, message });
        const testGetToken = this.decodeJWTToken({token: '12121212121212'});
        console.log('testGetToken...');
        console.log(testGetToken);        
    }

    mockRoomBookingVersion2(authorizedData, body) {
        console.log('Inside LocalStrategy mockRoomBookingVersion2');
        console.log('authorizedData...');
        console.log(authorizedData);

        console.log('body...');
        console.log(body);
        
        console.log('body.message...');
        console.log(body.message);
    }

}