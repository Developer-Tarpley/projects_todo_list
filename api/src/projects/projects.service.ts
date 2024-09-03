import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entity/project.entity';
import { ProjectsDTO } from 'src/auth/auth.controller';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>,
    ) { };

    async createProject(projectsDTO: ProjectsDTO, userId: number) {
        const project = {
            name: projectsDTO.name,
            description: projectsDTO.description,
            user: {
                id: userId
            }
        }
        return this.projectsRepository.save(project);
    }

    async find_userprojectid(id: number){
        const user = await this.projectsRepository.find({
            where: {user: {id}},
            relations: ['features', 'features.userstory'],
         })
        return user
    }
}
