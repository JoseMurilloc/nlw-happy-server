import nodemailer from 'nodemailer';
import configMail from '../config/mail';

class Mail {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: configMail.host,
      port: configMail.port,
      secure: false,
      auth: {
        user: configMail.auth.user,
        pass: configMail.auth.pass,
      },
    });
  }


  async sendMail(subject: string, text: string, html: string, email: string) {
    await this.transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>',
      to: `bar@example.com, ${email}`,
      subject,
      text,
      html,
    });
  }

}

export default new Mail();

// from: '"Fred Foo 👻" <foo@example.com>',
// to: "bar@example.com, jooseemurillo@gmail.com",
// subject: "Hello ✔",
// text: "Hello world?",
// html: "<b>Hello world?</b>",
