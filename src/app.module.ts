import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { User } from './typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CustomersModule, UsersModule,TypeOrmModule.forRoot({
    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      database: 'hotel_members',
      entities: [User],
      synchronize: true,
  }), AuthModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
