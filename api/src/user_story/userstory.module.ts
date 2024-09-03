import { Module } from "@nestjs/common";
import { UserstoryService } from "./userstory.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserStory } from "./entity/userstory.entity";



@Module({
    providers: [UserstoryService],
    exports: [UserstoryService],
    imports: [TypeOrmModule.forFeature([UserStory])],
})

export class UserstoryModule {}