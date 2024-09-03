import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { Project } from './entity/project.entity';

@Module({
  providers: [ProjectsService],
  exports: [ProjectsService],
  imports: [TypeOrmModule.forFeature([Project])]
})
export class ProjectsModule {}