import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsNotEmpty, IsEmail } from 'class-validator';

import * as sanitizeHTML from 'sanitize-html';
import { Transform } from 'class-transformer';
import { AuthGuard } from './auth.guard';

export class SignupDTO {
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

export class LoginDTO {
    @IsNotEmpty()
    @Transform((params)=> sanitizeHTML(params.value))
    username: string;

    @IsNotEmpty()
    password: string;
}

export class AccDetailsDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    field: string;
    
    @IsNotEmpty()
    @Transform((params)=> sanitizeHTML(params.value))
    value: string;
}

export class EmailDTO{
    @IsEmail(undefined, {message : 'Please enter a valid email address!'})
    @Transform((params)=> sanitizeHTML(params.value))
    email: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){};

    @Post('sign_up')
    signup(@Body() signupDTO: SignupDTO){
        return this.authService.signup(signupDTO);
    }
    
    @Post('log_in')
    login(@Body() loginDTO: LoginDTO){
        return this.authService.login(loginDTO);
    }

    @Post('reset_password')
    sendEmailVerification(@Body() body: EmailDTO){
        return this.authService.sendEmailPWDVerification(body.email);
    }

    @UseGuards(AuthGuard)
    @Post('edit_account_change')
    usersedit(@Body() accDetailsDTO: AccDetailsDTO){
        return this.authService.detailsUsersedit(accDetailsDTO)
    }

    @UseGuards(AuthGuard)
    @Get('cwc/user')
    async getprofileData(@Request() req){
        // console.log("req USER : ",req.user)
        return await this.authService.getprofileData(req.user.sub)
    }

}
