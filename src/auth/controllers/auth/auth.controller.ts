import { Controller,Headers, Patch, Post ,Request,UseGuards} from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../services/auth/auth.service';
import {LocalStraetgy} from '../../utils/LocalStrategy';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private localStraetgy: LocalStraetgy,
        ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req, @Body() Body,){
        const { username, password } = Body;
        console.log({
            username,
            password,
        })
        return this.localStraetgy.validate(username,password);
    };
    
    @Post('testDecodeHeaderToken')
    testToken(@Headers('authorization') header){
        console.log('HEADER...');
        console.log(header);
        return this.localStraetgy.decodeJWTToken({ token: header });
    }

    @Post('testMockRoomBookig')
    mockRoom(@Headers('authorization') header, @Body() body){
        console.log('Header: ',header);
        const authorizedData = this.localStraetgy.decodeJWTToken({ token: header });
        console.log('authorizedData: ',authorizedData);
        

        return this.localStraetgy.mockRoomBookingVersion2(authorizedData, body);
    }
    /*
    @Patch('changePassword')
    @UseGuards(AuthGuard)
    async changePassword(){

    }
    */

   

    // ORIGINAL
    // async login(@Request() req){}
}
