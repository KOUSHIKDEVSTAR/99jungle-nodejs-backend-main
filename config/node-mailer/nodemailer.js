const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { senderEmail, senderPass } = require('../staticValues');


// Email Template for OTP
const emailTemplateForOTP = (name, otp) => {
    return `
  <h1>Hi, ${name}</h1>
  <h4>Your OTP for Email verification : ${otp}</h4>
  <br>
  <br>
  <br>
  <p>Yours sincerely,</p>
  <p>99jungle</p>
  `;
}


// node mailer transporter setting
const createEmailTranspoter = () => {

    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'Gmail',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: senderEmail,
            pass: senderPass
        },
        tls: {
            rejectUnauthorized: true
        }
    });

}


// mailing option for nodemailer
const mailOptions = (sentEmailTo, name, otp) => {

    return {
        from: `"99Jungle" <sushil.webideasolution@gmail.com>`, // sender address
        to: sentEmailTo, // list of receivers
        subject: '99Jungle Email Verification', // Subject line
        text: '99Jungle Email Verification', // plain text body
        html: emailTemplateForOTP(name, otp) // html body
    };

}


// send mail 
const sendEmail = async(sentEmailTo, name, otp) => {
    let mailOption = mailOptions(sentEmailTo, name, otp);

    // send mail with defined transport object
    return new Promise((resolve, reject) => {
        createEmailTranspoter().sendMail(mailOption, async(error, info) => {
            // console.log('sent mail info : ', info);
            // console.log('sent mail Error : ', error);    
            if (error) {
                reject(error);
            }
            resolve(info);
        });
    });
}



module.exports = sendEmail;