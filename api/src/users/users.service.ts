import { Injectable } from '@nestjs/common';
import { User } from './entity/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDTO } from '../auth/auth.controller'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { };

    async find_user(username: string) {
        return this.usersRepository.findBy({ username })
    };

    async find_euser(email: string) {
        return this.usersRepository.findBy({ email })
    };


    async create_user(user: SignupDTO) {
        // console.log("USER: ", user)
        return await this.usersRepository.save({ ...user })
    }

}
