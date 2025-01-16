const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
    constructor() {
        // this.to = user.email;
        // this.firstName = user.name.split(' ')[0];
        // this.url = url;
        // this.from = `Producity Admin <${process.env.EMAIL_FROM}>`;
        this.to = "limingyanglmy11@gmail.com";
        this.firstName = "test";
        this.from = "e1121724@u.nus.edu";
    }

    newTransport() {
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });

    }

    // Send the actual email
    async send(template, subject) {
        // 1) Render HTML based on a pug template
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName: this.firstName,
            subject
        });

        // 2) Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.convert(html, {
                wordwrap: 130
            })
        };
        // 3) Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendReminder() {
        await this.send(
            'reminder',
            'Your meeting is scheduled to start in 15 minutes'
        );
    }
};


