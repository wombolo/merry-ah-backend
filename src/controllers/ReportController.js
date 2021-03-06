import Response from '../helpers/response';
import models from '../db/models';
import EmailNotificationAPI from '../helpers/EmailNotificationAPI';

const {
  Report, Art, User, ReportSummary
} = models;

const reporterMessage = `<h1>Feed back </h1>
<p> Thanks for reaching out to us on your concern, 
The necessary action has been taken on the report</p>
<strong>Thank you for choosing Art Cave</strong>
  `;

/**
 * Represents a ReportController.
 */
class ReportController {
  /**
   * @static
   * @param {Object} req
   * @param {object} res
   * @return {object} report
   */
  static async deleteReport(req, res) {
    try {
      const { reportId } = req.params;

      const reportQuery = await Report.findOne({
        attributes: ['userId'],
        where: { id: reportId }
      });
      const reporterId = reportQuery.userId;
      await Report.destroy({
        where: { id: reportId }
      });
      const reporter = await User.find({
        where: { id: reporterId }
      });
      const reporterEmail = reporter.email;
      const recipient = reporterEmail;
      const subject = 'Repreted Article feedback';
      const message = reporterMessage;
      const sendMail = new EmailNotificationAPI({
        recipient,
        subject,
        message,
      });
      await sendMail.sendEmail();

      const response = new Response(
        'ok',
        202,
        `Successfully closed report id ${reportId}`,
      );
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(
        'Internal server error',
        'Not ok',
        500,
        `${err}`,
      );
      return res.status(response.code).json(response);
    }
  }

  /**
   * @desc POST /api/v1/art/:id/report
   * @param {object} req
   * @param {object} res
   * @memberof ReportsController
   * @returns {Object} report type and text
   */
  static async createReport(req, res) {
    try {
      const { reportText } = req.body;
      const report = await Report.create({
        reportText,
        artId: req.params.id,
        userId: req.verifyUser.id,
      });
      const response = new Response(
        'Created',
        201,
        'Report as been recieved',
        report
      );
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(
        'Internal server error',
        'Not ok',
        500,
        `${err}`,
      );
      return res.status(response.code).json(response);
    }
  }

  /**
   * @static
   * @param {Object} req
   * @param {object} res
   * @return {object} report
   */
  static async reportArtAction(req, res) {
    try {
      const { reportId } = req.params;
      const {
        reporterId, artId, defaulterId
      } = req.query;
      await Art.destroy({
        where: { id: artId }
      });

      const defaulter = await User.findOne({
        attributes: ['email'],
        where: { id: defaulterId }
      });
      const defaulterEmail = defaulter.email;

      const offenceCount = await ReportSummary.findOne({
        where: { userId: defaulterId }
      });
      if (offenceCount) {
        if (offenceCount.reportCount < 2) {
          await ReportSummary.update({ reportCount: 2 },
            {
              where: { userId: defaulterId }
            });

          const recipient = defaulterEmail;
          const subject = 'Warning';
          const message = `This is your second offence,
            you will be deactivated on the third count, be warned`;
          const sendMail = new EmailNotificationAPI({
            recipient,
            subject,
            message,
          });
          await sendMail.sendEmail();

          const response = new Response(
            'Deleted',
            202,
            'Successfully deletes art and user warned',
          );
          return res.status(response.code).json(response);
        }
        await User.update({
          isActive: false
        },
        {
          where: { id: defaulterId }
        });
        const recipient = defaulterEmail;
        const subject = 'Warning';
        const message = `This is your 3rd offence,
        sorry your account have been deactivated`;
        const sendMail = new EmailNotificationAPI({
          recipient,
          subject,
          message,
        });
        await sendMail.sendEmail();
        const response = new Response(
          'Deleted',
          202,
          'Successfully deletes art and user removed',
        );
        return res.status(response.code).json(response);
      }
      const offenceCreated = await ReportSummary.create({
        reportCount: 1,
        userId: defaulterId
      });
      await Report.destroy({
        where: { id: reportId }
      });

      const reporter = await User.find({
        attributes: ['email'],
        where: { id: reporterId }
      });

      const reporterEmail = reporter.email;
      const recipient = reporterEmail;
      const subject = 'Reprted Article feedback';
      const message = reporterMessage;
      const sendMail = new EmailNotificationAPI({
        recipient,
        subject,
        message,
      });
      await sendMail.sendEmail();
      const defaulterSubject = 'Warning';
      const defaulterMessage = `This is your second offence,
        you will be deactivated on the third count, be warned`;
      const sendEmail = new EmailNotificationAPI({
        recipient: defaulterEmail,
        subject: defaulterSubject,
        message: defaulterMessage,
      });
      await sendEmail.sendEmail();

      const response = new Response(
        'Created',
        201,
        'Successfully deletes art and user  for the first time',
        offenceCreated
      );
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(
        'Internal server error',
        500,
        `${err}`,
      );
      return res.status(response.code).json(response);
    }
  }

  /**
   * @desc GET /api/v1/arts/reports
   * @param {object} req
   * @param {object} res
   * @memberof ReportsController
   * @returns {Object} report type and text
   */
  static async getAllReports(req, res) {
    const reports = await Report.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['email']
        },
        {
          model: Art,
          as: 'arts',
          attributes: ['title']
        },
      ],
    });
    const response = new Response(
      'Ok',
      200,
      'All reports',
      reports
    );
    return res.status(response.code).json(response);
  }
}
export default ReportController;
