import express from 'express';
import { TokenAuthenticate } from '../helpers/index';
import ReadingStat from '../middlewares/ReadingStatMiddleware';
import ArtsController from '../controllers/ArtsController';
import UserMiddleware from '../middlewares/UserMiddleware';
import ArtistVerify from '../middlewares/ArtistVerify';
import ArticleValidator from '../middlewares/ArticleValidator';

const artsRoute = express.Router();

artsRoute.post(
  '/:artId/like',
  TokenAuthenticate.tokenVerify,
  UserMiddleware.validateArtID,
  ArtsController.likeArticle,
);

artsRoute.post(
  '/:artId/dislike',
  TokenAuthenticate.tokenVerify,
  UserMiddleware.validateArtID,
  ArtsController.dislikeArticle,
);

artsRoute.post(
  '/',
  TokenAuthenticate.tokenVerify,
  ArticleValidator.createArticleValidator,
  ArtistVerify.userTypeChecker,
  ArtsController.create
);

artsRoute.put(
  '/:slug',
  TokenAuthenticate.tokenVerify,
  ArtistVerify.userTypeChecker,
  ArtsController.update
);

artsRoute.delete(
  '/:slug',
  TokenAuthenticate.tokenVerify,
  ArtistVerify.userTypeChecker,
  ArtsController.delete
);

artsRoute.get('/', ArtsController.getAllArticles);
artsRoute.get('/:slug', ReadingStat.getStat, ArtsController.getSingleArticle);
artsRoute.get('/', ArtsController.getAllArticles);

export default artsRoute;
