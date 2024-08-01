import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

type signupDTO = {
    name: string,
    email: string,
    username: string,
    password: string,
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('sign_up')
    signup(@Body() signupDTO: signupDTO){
        return this.authService.signup(signupDTO)
    }

}
