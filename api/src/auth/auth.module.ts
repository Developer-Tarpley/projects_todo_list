import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from 'src/mail/mail.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { FeaturesModule } from 'src/feature/features.module';
import { UserstoryModule } from 'src/user_story/userstory.module';


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    ProjectsModule,
    FeaturesModule,
    MailModule,
    UserstoryModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory: async (configService: ConfigService)=> ({
        global: true,
        secret: configService.get<string>('DATABASE_JWT'),
        signOptions: { expiresIn: '7200s' },
      }),
      inject: [ConfigService]
    })
  ]
})
export class AuthModule {}
