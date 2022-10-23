import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm';
import { UsersService } from '../users/services/users/users.service';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { LocalStraetgy } from './utils/LocalStrategy';
/*add*/
import { UsersModule } from '../users/users.module';
import { JwtModule,JwtService } from '@nestjs/jwt';


@Module({
  imports:[PassportModule.register({
    defaultStrategy:'jwt',
    approval_prompt:'force',
    access_type:'offline',
  }),
  JwtModule.register({
    secret:'Jame12345',
    signOptions: {
      expiresIn: '1d',
    }
    
    // secret: '',
    // signOptions:{
    //   expiresIn: ''

  }),
    TypeOrmModule.forFeature([User]),],
  controllers: [AuthController],
  providers: [
    {
      provide:'AUTH_SERVICE',
      useClass:AuthService,
    },{
      provide:'USER_SERVICE',
      useClass:UsersService,
    },
    LocalStraetgy,
    AuthService
  ],
})
export class AuthModule {}
