import { Project } from 'src/projects/entity/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Project, (projects)=>projects.user)
    projects: Project[];

}