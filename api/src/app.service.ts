import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Name } from './name.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Name)
    private namesRepository: Repository<Name>,
  ) {}
  
  async addName(firstName : string, lastName: string){
    // console.log("NAME: ", name);
    await this.namesRepository.save({first_name: firstName, last_name: lastName})
    return await this.getNames();
  }

  async getNames(){
    const allNames = await this.namesRepository.find();
    console.log("All Names", allNames);
    return allNames;
  }
}
