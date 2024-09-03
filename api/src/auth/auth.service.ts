import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { AccDetailsDTO, FeaturesDTO, LoginDTO, ProjectsDTO, SignupDTO, UserStoryDTO } from './auth.controller';
import { User } from 'src/users/entity/users.entity';
import { MailService } from 'src/mail/mail.service';
import { ProjectsService } from 'src/projects/projects.service';
import { FeaturesService } from 'src/feature/features.service';
import { UserstoryService } from 'src/user_story/userstory.service';




@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private mailService: MailService,
        private projectsService: ProjectsService,
        private featuresService: FeaturesService,
        private userstoryService: UserstoryService,
    ) { }

    async createHashAuth(userhash: string) {
        const saltrounds = 10;
        return bcrypt.hash(userhash, saltrounds)
    }

    async createAccessToken(user: User, secret?: string) {
        // console.log("create access: ", user)
        const payload = { sub: user.id };

        if (secret) {
            return await this.jwtService.signAsync(payload, {
                secret: secret,
                expiresIn: '10m',
            });
        } else {
            return await this.jwtService.signAsync(payload);
        }
    }

    async createproject(projectsDTO: ProjectsDTO, userId: number) {
        return await this.projectsService.createProject(projectsDTO, userId);
    }

    async createfeature(featuresDTO: FeaturesDTO, userId: number) {
        const projects = await this.projectsService.find_userprojectid(userId);
        const projectId = projects.find((project)=> project.id === featuresDTO.projectId)

        return await this.featuresService.createProjectFeature(featuresDTO, projectId.id);
    }
    
    async createUserStory(userstoryDTO: UserStoryDTO, userId: number) {
        console.log("userstoryDTO", userstoryDTO);
        console.log("userstory userid", userId);

        const projects = await this.projectsService.find_userprojectid(userId);
        // console.log("projects: ", projects)
        const projectfeatures = projects.find((project)=> project.id === userstoryDTO.projectId)
        // console.log("project id filtered: ", projectfeatures)
        
        const featureId = projectfeatures.features.find((feature)=> feature.id === userstoryDTO.featureId)
        // console.log("feature id filtered: ", featureId)

        return await this.userstoryService.createFeatureuserstory(userstoryDTO, featureId.id);
    }
   
   


    async signup(signupDTO: SignupDTO) {
        // check if username already exists
        const unameExists = (await this.usersService.find_user(signupDTO.username)).length > 0;

        // check if email already exists
        const enameExists = (await this.usersService.find_euser(signupDTO.email)).length > 0;

        if (unameExists) {
            throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'user exists!' });
        } else if (enameExists) {
            throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'email exists!' });
        }

        const hasheduser = await this.createHashAuth(signupDTO.password)
        signupDTO.password = hasheduser

        const user = await this.usersService.create_user(signupDTO);
        return await this.createAccessToken(user);
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const users = await this.usersService.find_user(username);
        // console.log("val user: ", users)

        if (users.length === 0) {
            throw new BadRequestException();
        }

        const user = users[0];
        const islog = await this.isnotlogMatch(pass, user.password);


        if (user && islog) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async isnotlogMatch(credit1: string, credit2: string) {
        return await bcrypt.compare(credit1, credit2)
    }

    async login(loginDTO: LoginDTO) {
        // check if username already exists
        const user = (await this.validateUser(loginDTO.username, loginDTO.password));

        if (!user) {
            throw new BadRequestException();
        } else {
            return await this.createAccessToken(user);
        }

    }

    async getprofileData(id: number) {
        const user = await this.usersService.find_userid(id);
        const data = user[0]

        if (!data) {
            return {}
        } else {

            return {
                email: data.email,
                name: data.name,
                username: data.username,
            }
        }
    }

    async getprojectsdata(id: number) {
        const user = await this.getprofileData(id);
        const projects = await this.projectsService.find_userprojectid(id);

        return {
            user,
            projects
        }
    }

    async getproject(id: number, userId: number) {
        const projects = await this.getprojectsdata(userId);
        return projects.projects.filter(project => project.id === id)
    }

    async sendEmailPWDVerification(email: string) {
        const user = await this.usersService.find_euser(email);
        const data = user[0];

        if (data === undefined) {
            throw new BadRequestException("email not found.");
        }

        const token = await this.createAccessToken(data, data.password);

        return await this.mailService.sendPWDResetEmail(data, token);

    }

    async savenewpassword(pass: string, id: number, token: string) {
        const user = await this.usersService.find_userid(id);
        const data = user[0];

        const payload = await this.jwtService.verifyAsync(
            token,
            {
                secret: data.password,
            }
        )
        console.log("Payload: ", payload);
        console.log("Data: ", data);
        if (!payload) {
            throw new BadRequestException();

        } else {
            let newhashed = await this.createHashAuth(pass);
            console.log("hash: ", newhashed);
            data.password = newhashed;
            console.log("Data change: ", data);

            return await this.usersService.create_user(data);
        }
    }

    async detailsUsersedit(accDetailsDTO: AccDetailsDTO) {
        const user = await this.usersService.find_user(accDetailsDTO.username);
        const data = user[0];
       
        if (accDetailsDTO.field === 'password') {
            // check password validation
            let usersnewvalue = accDetailsDTO.value
            const hashedusersEdit = await this.createHashAuth(usersnewvalue)
            
            data[accDetailsDTO.field] = hashedusersEdit
           
        } else {
            data[accDetailsDTO.field] = accDetailsDTO.value;
        }

        const usersupdate = await this.usersService.create_user(data)
        return {
            email: usersupdate.email,
            name: usersupdate.name,
            username: usersupdate.username
        }

    }

    async userdelete(id: number) {
        return await this.usersService.todeleteuser(id);
    }
}