import { Injectable } from "@nestjs/common";
import { User } from "src/users/entity/users.entity";
import sendmail from "./mail";
import verficationPWDemailTemplate from "./htmlverifyemail_template";


@Injectable()
export class MailService {

    async sendPWDResetEmail(user: User, token: string) {
        sendmail({
            from: process.env.maileruser,
            to: user.email,
            subject: "'Projects planning tools: 'Reset your password. ",
            html: verficationPWDemailTemplate(token, user.id),
        }, () => {
            console.log("reset password veification email sent!")
        })
        return 'HI'
    }
}