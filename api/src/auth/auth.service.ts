import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { LoginDTO, SignupDTO } from './auth.controller';




@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async createHashAuth(userhash: string) {
        const saltrounds = 10;
        return bcrypt.hash(userhash, saltrounds)
    }

    async createAccessToken(user: any) {
        // console.log("create access: ", user)
        const payload = { sub: user.userId, username: user.username };
        return await this.jwtService.signAsync(payload);
    }


    async signup(signupDTO: SignupDTO) {
        // check if username already exists
        const unameExists = (await this.usersService.find_user(signupDTO.username)).length > 0;

        // check if email already exists
        const enameExists = (await this.usersService.find_euser(signupDTO.email)).length > 0;

        if (unameExists) {
            throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'user exists!' });
        } else if (enameExists) {
            throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'email exists!' });
        }

        const hasheduser = await this.createHashAuth(signupDTO.password)
        signupDTO.password = hasheduser

        const user = await this.usersService.create_user(signupDTO);
        return await this.createAccessToken(user);
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const users = await this.usersService.find_user(username);
        // console.log("val user: ", users)

        if (users.length === 0) {
            throw new BadRequestException();
        }

        const user = users[0];
        const islog = await this.isnotlogMatch(pass, user.password);


        if (user && islog) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

    async isnotlogMatch(credit1: string, credit2: string) {
        return await bcrypt.compare(credit1, credit2)
    }

    async login(loginDTO: LoginDTO) {
        // check if username already exists
        const user = (await this.validateUser(loginDTO.username, loginDTO.password));
        // console.log("length user", user)

        if(!user){
            throw new BadRequestException();
        }else{
            return await this.createAccessToken(user);
        }

    }

    async getprofileData(username: string){
        const user = await this.usersService.find_user(username);
        const data = user[0]
        // console.log("user data: ", user)
        return {
            email: data.email,
            name : data.name,
            username: data.username

        }
    }
}