import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsNotEmpty, IsEmail } from 'class-validator';

import * as sanitizeHTML from 'sanitize-html';
import { Transform } from 'class-transformer';

class signupDTO {
    @IsNotEmpty()
    @Transform((params)=> sanitizeHTML(params.value))
    name: string;

    @IsEmail()
    @Transform((params)=> sanitizeHTML(params.value))
    email: string;

    @IsNotEmpty()
    @Transform((params)=> sanitizeHTML(params.value))
    username: string;

    @IsNotEmpty()
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('sign_up')
    signup(@Body() signupDTO: signupDTO){
        return this.authService.signup(signupDTO)
    }

}
