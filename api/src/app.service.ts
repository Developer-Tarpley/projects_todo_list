import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/entity/users.entity';

@Injectable()
export class AppService {
  // constructor(
  //   @InjectRepository(User)
  //   private usersRepository: Repository<User>,
  // ) {}
  
  // async addName(firstName : string, lastName: string){
  //   // console.log("NAME: ", name);
  //   await this.namesRepository.save({first_name: firstName, last_name: lastName})
  //   return await this.getNames();
  // }

  // async getNames(){
  //   const allNames = await this.namesRepository.find();
  //   console.log("All Names", allNames);
  //   return allNames;
  // }
}
