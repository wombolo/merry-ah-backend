import Validation from '../helpers/Validation';
import models from '../db/models';
import Response from '../helpers/response';

const { User } = models;

/**
 * User Middleware Class
 */
class UserMiddleware {
/**
 * VerifyEmail
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @memberof UserMiddleware
 * @returns {object} email verification
 */
  static async VerifyEmail(req, res, next) {
    try {
      const { email } = req.body;
      const validateEmail = Validation.checkEmptyField(email);
      if (validateEmail !== true) {
        const response = new Response(
          'Bad Request',
          400,
          'Email field cannot be left empty',
        );
        return res.status(response.code).json(response);
      }
      const checkEmail = await User.findOne({
        where: {
          email,
        },
        attributes: ['username', 'email'],
      });
      if (!checkEmail) {
        const response = new Response(
          'Not Found',
          404,
          'Email does not exist',
        );
        return res.status(response.code).json(response);
      }
      req.checkEmail = checkEmail;
      next();
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
 * Validate Password
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @memberof UserMiddleware
 * @returns {object} validated password
 */
  static async validatePassword(req, res, next) {
    try {
      const user = req.verifyUser;
      const { email } = user;
      const { password, confirmPassword } = req.body;

      const fields = [
        { name: 'Password', value: password },
        { name: 'Confirm Password', value: confirmPassword }
      ];

      const validate = Validation.checkEmptyFields(fields);

      if (validate !== true) {
        const response = new Response(
          'Bad Request',
          400,
          `${validate.field} field cannot be empty`,
        );
        return res.status(response.code).json(response);
      }

      if (!Validation.compareValues(password, confirmPassword)) {
        const response = new Response(
          'Bad Request',
          400,
          'Passwords do not match'
        );
        return res.status(response.code).json(response);
      }
      req.email = email;
      next();
    } catch (err) {
      const response = new Response(
        'Internal server error',
        500,
        `${err}`,
      );
      return res.status(response.code).json(response);
    }
  }
}

export default UserMiddleware;
