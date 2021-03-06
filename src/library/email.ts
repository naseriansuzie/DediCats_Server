import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

const makeHtml = (nickname:string, secretCode:string, option:string):string => {
    if (option === "signIn") {
        return `
        <div style="text-align : center">
        <img style="display : inline" src="https://lh3.google.com/u/0/d/1TqLpc4xvwkUTeLrRASDc2Y0c4nme8t3g=w1870-h975-iv1"/>
        </div>
        <p>Annyung Haseyo! ${nickname}!</p>
        <p>Thanks for joining Dedicats! We really appreciate it. Please insert this code into email verfication to verify your account</p>
        <h1>Your code is  <br><span style="text-decoration:underline">${secretCode}<span></h1>
        <h2>This code will only be valid for 1 hour.</h2>
        <p>if you have any problems, please contact us : dediCats16@gmail.com</p>`;
    }
    // (option === "pwInitialization")
    return `
        <div style="text-align : center">
        <img style="display : inline" src="https://lh3.google.com/u/0/d/1TqLpc4xvwkUTeLrRASDc2Y0c4nme8t3g=w1870-h975-iv1"/>
        </div>
        <p>Annyung Haseyo! ${nickname}!</p>
        <p>Thanks for using Dedicats! We really appreciate it. Please insert this temporary password to log in and reset your password. Make sure to change your temporary password in MyPage! </p>
        <h1>Your code is  <br><span style="text-decoration:underline">${secretCode}<span></h1>
        <h2>This code will only be valid for 1 hour.</h2>
        <p>if you have any problems, please contact us: dediCats16@gmail.com</p>`;
};

const sendMail = async (nickname:string, email:string, option:string):Promise<string> => {
    const secretCode = Math.random().toString(36).slice(6);

    const transporter = nodemailer.createTransport(smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: process.env.DEVMAIL,
            pass: process.env.DEVMAILPW,
        },
    }));

    const html:string = makeHtml(nickname, secretCode, option);
    const mailOptions = {
        from: "\"DediCats\" <dediCats16@gmail.com>",
        to: email,
        subject: "Email Verification for Dedicats",
        html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Failed to send email");
            throw error;
            // res.status(409).send("Failed to send email");
        }
        console.log(`Email sent: ${info.response}`);
        // res.status(201).send(signupCode);
    });

    return secretCode;
};

export default sendMail;
