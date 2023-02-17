const nodemailer = require('nodemailer');

const Config = require('./Config');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: Config.mail.MAIL_HOST,
      port: Config.mail.MAIL_PORT,
      auth: {
        user: Config.mail.MAIL_ADDRESS,
        pass: Config.mail.MAIL_PASSWORD,
      },
    });
  }

  sendEmail({
    targetEmail, subject, text, attachments,
  }) {
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
