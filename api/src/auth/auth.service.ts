import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    signup(signupDTO: { name: string; email: string; username: string; password: string; }){
        console.log("sign up dto: ", signupDTO);
    }
}
