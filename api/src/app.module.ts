import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import typeorm from './config/typeorm';
import { User } from './users/entity/users.entity';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
// import * as dotenv from 'dotenv';
// dotenv.config();


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    // TypeOrmModule.forFeature([User]),
    AuthModule,
    UsersModule,
  ],
  // controllers: [AuthController],
  // providers: [AuthService],
})
export class AppModule {}
