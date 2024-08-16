import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { AccDetailsDTO, LoginDTO, SignupDTO } from './auth.controller';
import { User } from 'src/users/entity/users.entity';
import { MailService } from 'src/mail/mail.service';




@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService, private mailService: MailService) { }

    async createHashAuth(userhash: string) {
        const saltrounds = 10;
        return bcrypt.hash(userhash, saltrounds)
    }

    async createAccessToken(user: User, secret?: string) {
        // console.log("create access: ", user)
        const payload = { sub: user.id };

        if (secret) {
            return await this.jwtService.signAsync(payload, {
                secret: secret,
                expiresIn: '10m',
            });
        } else {
            return await this.jwtService.signAsync(payload);
        }
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

        if (!user) {
            throw new BadRequestException();
        } else {
            return await this.createAccessToken(user);
        }

    }

    async getprofileData(id: number) {
        const user = await this.usersService.find_userid(id);
        const data = user[0]
        // console.log("user data: ", user)
        return {
            email: data.email,
            name: data.name,
            username: data.username

        }
    }

    async sendEmailPWDVerification(email: string) {
        const user = await this.usersService.find_euser(email);
        const data = user[0];

        if (data === undefined) {
            throw new BadRequestException("email not found.");
        }

        const token = await this.createAccessToken(data, data.password);
        
        return await this.mailService.sendPWDResetEmail(data, token);

    }

    async detailsUsersedit(accDetailsDTO: AccDetailsDTO) {
        // console.log("accDetailsDTO: ", accDetailsDTO)
        const user = await this.usersService.find_user(accDetailsDTO.username);
        const data = user[0];
        //   console.log("USER: ", user)
        if (accDetailsDTO.field === 'password') {
            // check password validation
            let usersnewvalue = accDetailsDTO.value
            const hashedusersEdit = await this.createHashAuth(usersnewvalue)
            // console.log("pwd edit: ",hashedusersEdit)
            data[accDetailsDTO.field] = hashedusersEdit
            // console.log("USER: ", user)
        } else {
            data[accDetailsDTO.field] = accDetailsDTO.value;
        }

        const usersupdate = await this.usersService.create_user(data)
        return {
            email: usersupdate.email,
            name: usersupdate.name,
            username: usersupdate.username
        }

    }
}