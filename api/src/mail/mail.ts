import * as nodemailer from 'nodemailer';
const dotenv = require("dotenv");
dotenv.config();

// THIS IS MY TESTING UNTIL IM ABLE TO FIND A SOLUTION!!!!!!!!!!!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "49272a495863ef",
    pass: "1b3895658656a3"
  }
});
  export default async function sendmail (mailOptions: any, callback: any){
    try{
        const details = await transport.sendMail(mailOptions);
        callback(details);
    }catch(error){
        console.log(error);
    }
  }