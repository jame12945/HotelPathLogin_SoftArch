import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { LocalStraetgy } from '../auth/utils/LocalStrategy';
import {AuthService} from '../auth/services/auth/auth.service';
import { JwtModule,JwtService } from '@nestjs/jwt';
@Module({
  imports: [
  JwtModule.register({
    secret:'Jame12345',
    signOptions: {
      expiresIn: '1d',
    }
    
    // secret: '',
    // signOptions:{
    //   expiresIn: ''

  }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [{
    provide: 'USER_SERVICE',
    useClass: UsersService,
  }, {
    provide:'AUTH_SERVICE',
    useClass:AuthService,
  },
  LocalStraetgy,
  AuthService
],
})
export class UsersModule {}
