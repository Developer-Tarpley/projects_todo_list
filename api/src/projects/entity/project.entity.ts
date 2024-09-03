import { Feature } from 'src/feature/entity/feature.entity';
import { User } from 'src/users/entity/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>User, (user)=>user.projects)
    user:User;
   
    @Column()
    name: string;

    @Column({nullable: true})
    description?: string;

    @Column({default: 'To Do'})
    status: string;

    @OneToMany(() => Feature, (features)=>features.project)
    features: Feature[];
}