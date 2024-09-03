import { Body, Controller, Get, Optional, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsNotEmpty, IsEmail } from 'class-validator';

import * as sanitizeHTML from 'sanitize-html';
import { Transform } from 'class-transformer';
import { AuthGuard } from './auth.guard';

export class SignupDTO {
    @IsNotEmpty()
    @Transform((params) => sanitizeHTML(params.value))
    name: string;

    @IsEmail()
    @Transform((params) => sanitizeHTML(params.value))
    email: string;

    @IsNotEmpty()
    @Transform((params) => sanitizeHTML(params.value))
    username: string;

    @IsNotEmpty()
    password: string;
}

export class LoginDTO {
    @IsNotEmpty()
    @Transform((params) => sanitizeHTML(params.value))
    username: string;

    @IsNotEmpty()
    password: string;
}

export class AccDetailsDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    field: string;

    @IsNotEmpty()
    @Transform((params) => sanitizeHTML(params.value))
    value: string;
}

export class EmailDTO {
    @IsEmail(undefined, { message: 'Please enter a valid email address!' })
    @Transform((params) => sanitizeHTML(params.value))
    email: string;
}

export class NewPWDDTO {
    @IsNotEmpty()
    @Transform((params) => sanitizeHTML(params.value))
    value: string;

    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    token: string;
}

export class ProjectsDTO {
    @IsNotEmpty()
    @Transform((params) => sanitizeHTML(params.value))
    name: string;

    @Optional()
    @Transform((params) => sanitizeHTML(params.value))
    description: string;
}

export class FeaturesDTO {
    @IsNotEmpty()
    @Transform((params) => sanitizeHTML(params.value))
    name: string;

    @Optional()
    @Transform((params) => sanitizeHTML(params.value))
    description: string;

    @IsNotEmpty()
    projectId: number;

}

export class UserStoryDTO {
    @IsNotEmpty()
    @Transform((params) => sanitizeHTML(params.value))
    name: string;

    @Optional()
    @Transform((params) => sanitizeHTML(params.value))
    description: string;

    @IsNotEmpty()
    featureId: number;
    
    @IsNotEmpty()
    projectId: number;

}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { };

    @Post('sign_up')
    signup(@Body() signupDTO: SignupDTO) {
        return this.authService.signup(signupDTO);
    }

    @Post('log_in')
    login(@Body() loginDTO: LoginDTO) {
        return this.authService.login(loginDTO);
    }

    @Post('reset_password')
    sendEmailVerification(@Body() body: EmailDTO) {
        return this.authService.sendEmailPWDVerification(body.email);
    }

    @Post('new/reset_password/update')
    sendnewpassword(@Body() body: NewPWDDTO) {
        // console.log("NewPWD DTO: ", body)
        return this.authService.savenewpassword(body.value, body.id, body.token);
    }

    @UseGuards(AuthGuard)
    @Post('edit_account_change')
    usersedit(@Body() accDetailsDTO: AccDetailsDTO) {
        return this.authService.detailsUsersedit(accDetailsDTO)
    }

    @UseGuards(AuthGuard)
    @Get('cwc/user')
    async getprofileData(@Request() req: any) {
        return await this.authService.getprofileData(req.user.sub)
    }

    @UseGuards(AuthGuard)
    @Post('u/delete')
    async usersdelete(@Request() req: any) {
        // console.log("req USER : ",req.user)
        return await this.authService.userdelete(req.user.sub)
    }

    @UseGuards(AuthGuard)
    @Get('u/projects')
    async getusersprojects(@Request() req: any) {
        return await this.authService.getprojectsdata(req.user.sub)
    }

    @UseGuards(AuthGuard)
    @Post('u/create_project')
    async createproject(@Body() projectsDTO: ProjectsDTO, @Request() req: any) {
        return await this.authService.createproject(projectsDTO, req.user.sub);
    }
  
    @UseGuards(AuthGuard)
    @Post('u/create_feature')
    async createfeature(@Body() featuresDTO: FeaturesDTO, @Request() req: any) {
        return await this.authService.createfeature(featuresDTO, req.user.sub);
    }
   
    @UseGuards(AuthGuard)
    @Post('u/create_user_story')
    async createuserstory(@Body() userstoryDTO: UserStoryDTO, @Request() req: any) {
        // console.log("userstory DTO: ", userstoryDTO)
        // console.log("userstory DTO REQ: ", req.user.sub)
        return await this.authService.createUserStory(userstoryDTO, req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Get('/u/project/:id')
    async getusersproject(@Param('id') id: number, @Request() req: any) {
        return await this.authService.getproject(id, req.user.sub);
    }

}
