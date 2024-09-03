import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserStory } from "./entity/userstory.entity";
import { Repository } from "typeorm";
import { UserStoryDTO } from "src/auth/auth.controller";

@Injectable()
export class UserstoryService{
    constructor(
        @InjectRepository(UserStory)
        private userstoryRepository: Repository<UserStory>
    ){}

    async find_userstoryfeatureid(id: number) {
        const user = await this.userstoryRepository.find({
             where: { feature: { id } },
            })
        return user
    }
    async createFeatureuserstory(userstoryDTO: UserStoryDTO, featureId: number) {
        // console.log("project featuer id: ", projectId)
        const userstory = {
            name: userstoryDTO.name,
            description: userstoryDTO.description,
            feature: {
                id: featureId
            }
        }
        // console.log("save featutre: ", feature)
        await this.userstoryRepository.save(userstory);

        return this.find_userstoryfeatureid(featureId)
    }
}