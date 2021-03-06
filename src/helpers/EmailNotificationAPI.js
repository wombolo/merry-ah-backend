import 'babel-polyfill';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Represents a EmailNotificationAPI.
 */
class EmailNotificationAPI {
  /**
   * @constructor
   * @param {Object} emailPayload - The title of the book.
   */
  constructor(emailPayload) {
    this.mailOptions = {
      from: `"Merry Ah" <${process.env.EMAILUSER}>`, // sender address
      to: emailPayload.recipient, // list of receivers
      bcc: emailPayload.bcc,
      subject: emailPayload.subject, // Subject line
      text: emailPayload.message, // html body
      html: `<p> ${emailPayload.message} </p>` // html body
    };
  }

  /**
   * @Represents a transportCreator
   * @return {Object|string} nodemailer Transport OR Error message string.
   */
  static transportCreator() {
    const {
      EMAILUSER, EMAILPASS
    } = process.env;
    if (!EMAILUSER || !EMAILPASS) {
      return 'Please configure your .env file properly';
    }

    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAILUSER,
        pass: EMAILPASS
      }
    });
  }

  /**
   * @Represents sendEmail
   * @return {string|Object} Success message | Error
   */
  async sendEmail() {
    const { mailOptions } = this;
    if (process.env.NODE_ENV === 'production') {
      try {
        const mail = await EmailNotificationAPI.transportCreator()
          .sendMail(mailOptions);
        if (mail.response.includes('OK')) {
          return 'Message sent';
        }
      } catch (error) {
        return error;
      }
    } else {
      return 'Message sent';
    }
  }
}

export default EmailNotificationAPI;
