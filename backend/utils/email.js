const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');
const parseDateTime = require('./dateTime.js')

module.exports = class Email {
    constructor(to, firstName) {
        this.to = to;
        this.firstName = firstName || 'Participant';
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
    
    generateGoogleCalendarLink(title, startTime, endTime, description) {
        try {
            // Parse and format dates
            const start = parseDateTime(startTime).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
            const end = parseDateTime(endTime).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
            const baseUrl = 'https://calendar.google.com/calendar/render';
            const params = new URLSearchParams({
                action: 'TEMPLATE',
                text: title,
                dates: `${start}/${end}`,
                details: description || '',
                sf: 'true',
                output: 'xml',
            });
    
            return `${baseUrl}?${params.toString()}`;
        } catch (error) {
            console.error('Error generating Google Calendar link:', error.message);
            throw error;
        }
    }
    

    // Send the actual email
    async send(template, subject, data = {}) {
        // Render HTML using the Pug template
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            ...data,
            firstName: this.firstName,
            subject,
        });

        // Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.convert(html, { wordwrap: 130 }),
        };

        // Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendMeetingConfirmation(title, description, startTime, endTime) {
        const startDate = parseDateTime(startTime);
        const endDate = parseDateTime(endTime);

        const calendarLink = this.generateGoogleCalendarLink(title, startTime, endTime, description);

        await this.send('meetingConfirmation', `Meeting Invitation: ${title}`, {
            title,
            description,
            startTime: startDate.toLocaleString(),
            endTime: endDate.toLocaleString(),
            calendarLink,
        });
    }

    async sendReminderEmail(title, description, startTime, endTime) {
      
        // Prepare the data to be passed to the Pug template
        const startDate = parseDateTime(startTime);
        const endDate = parseDateTime(endTime);

        const calendarLink = this.generateGoogleCalendarLink(title, startTime, endTime, description);

        await this.send('reminder', `Reminder: Your meeting is scheduled to start in 15 minutes`, {
            title,
            description,
            startTime: startDate.toLocaleString(),
            endTime: endDate.toLocaleString(),
            calendarLink,
        });
      }
};


