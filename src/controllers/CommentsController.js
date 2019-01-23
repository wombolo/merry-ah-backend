import models from '../db/models';
import Response from '../helpers/response';

const { Comment, Art, UpdatedComment } = models;

/**
 * Represents a CommentsController.
 */
class CommentsController {
  /**
   * @static
   * @param {Object} req
   * @param {object} res
   * @return {object} comment
   */
  static async createComment(req, res) {
    try {
      const { body } = req.body;
      const { artId } = req.params;
      const { id } = req.verifyUser;

      const findArt = await Art.find({
        where: {
          id: artId
        }
      });
      if (findArt) {
        await Comment.create({
          userId: id,
          artId,
          body
        });
        const response = new Response(
          'created',
          201,
          'Comment added successfully',
        );
        return res.status(response.code).json(response);
      }
      const response = new Response(
        'Not Found',
        404,
        'This art does not exist',
      );
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(
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
   * @return {object} updated comment
   */
  static async updateComment(req, res) {
    try {
      const { body } = req.body;
      const { commentId } = req.params;
      const { id } = req.verifyUser;
      const findComment = await Comment.find({
        where: {
          id: commentId
        }
      });
      if (findComment) {
        if (findComment.userId === id) {
          await UpdatedComment.create({
            body: findComment.body,
            commentId
          });
          await Comment.update({
            body
          },
          {
            where: {
              id: commentId
            }
          });
          const response = new Response(
            'Ok',
            200,
            'Comment updated successfully',
          );
          return res.status(response.code).json(response);
        }
        const response = new Response(
          'Unauthorized',
          401,
          'You are not authorized to update this comment',
        );
        return res.status(response.code).json(response);
      }
      const response = new Response(
        'Not Found',
        404,
        'This comment does not exist',
      );
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(
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
   * @return {object} Edit history comment
   */
  static async getEditHistory(req, res) {
    try {
      const { commentId } = req.params;
      const getUpdatedComments = await UpdatedComment.findAll({
        where: {
          commentId,
        }
      });
      if (getUpdatedComments.length < 1) {
        const response = new Response(
          'Not found',
          404,
          'This comment has not been edited',
        );
        return res.status(response.code).json(response);
      }
      const response = new Response(
        'Ok',
        200,
        'Successfully retrieved updated comment history',
        getUpdatedComments
      );
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(
        'Not ok',
        500,
        `${err}`,
      );
      return res.status(response.code).json(response);
    }
  }
}

export default CommentsController;
