const nodemailer = require('nodemailer');
 
class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }
 
  sendEmail({targetEmail,subject,text, attachments}) {
    const message = {
      from: 'Open Music',
      to: targetEmail,
      subject,
      text,
      attachments,
    };
 
    return this._transporter.sendMail(message);
  }
}
 
module.exports = MailSender;