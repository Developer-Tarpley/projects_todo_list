import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FeaturesDTO } from 'src/auth/auth.controller';
import { Feature } from './entity/feature.entity';

@Injectable()
export class FeaturesService {
    constructor(
        @InjectRepository(Feature)
        private featuresRepository: Repository<Feature>,
    ) { };

    async find_userprojectfeatureid(id: number) {
        const user = await this.featuresRepository.find(
            {
                where: { project: { id } },
            }
        )
        return user
    }
    async createProjectFeature(featuresDTO: FeaturesDTO, projectId: number) {
        // console.log("project featuer id: ", projectId)
        const feature = {
            name: featuresDTO.name,
            description: featuresDTO.description,
            project: {
                id: projectId
            }
        }
        // console.log("save featutre: ", feature)
        await this.featuresRepository.save(feature);

        return this.find_userprojectfeatureid(projectId)
    }


}
