import * as nodemailer from 'nodemailer';
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.maileruser,
      pass: process.env.mailerpassword,
    },
  });

  export default async function sendmail (mailOptions: any, callback: any){
    try{
        const details = await transporter.sendMail(mailOptions);
        callback(details);
    }catch(error){
        console.log(error);
    }
  }