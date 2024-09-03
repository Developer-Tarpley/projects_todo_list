import { Feature } from "src/feature/entity/feature.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserStory{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Feature, (feature)=>feature.userstory)
    feature: Feature;
   
    @Column()
    name: string;

    @Column({nullable: true})
    description?: string;

}