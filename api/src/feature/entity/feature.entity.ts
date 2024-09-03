import { Project } from 'src/projects/entity/project.entity';
import { UserStory } from 'src/user_story/entity/userstory.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';

@Entity()
export class Feature {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Project, (project)=>project.features)
    project: Project;
   
    @Column()
    name: string;

    @Column({nullable: true})
    description?: string;

    @Column({default: 'To Do'})
    status: string;

    @OneToMany(()=>UserStory,(userstory)=>userstory.feature)
    userstory: UserStory[] 

}