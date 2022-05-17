import { Router } from 'express';
import userController from '../controllers/userController';
import userMiddleware from '../middlewares/userMiddleware';

const router = Router();

router
  .post(
    '/',
    userMiddleware.withoutName,
    userMiddleware.withoutEmail,
    userMiddleware.withoutPassword,
    userMiddleware.invalidEmail,
    userMiddleware.nameLength,
    userMiddleware.passwordLength,
    userMiddleware.checkUser,
    userController.createUser
  )
  .get('/search/:page', userController.findAllUser)
  .get(
    '/specific',
    userMiddleware.withoutEmail,
    userMiddleware.withoutPassword,
    userMiddleware.invalidEmail,
    userController.findUser
  )
  .put(
    '/:id',
    userMiddleware.withoutName,
    userMiddleware.withoutEmail,
    userMiddleware.withoutPassword,
    userMiddleware.invalidEmail,
    userMiddleware.nameLength,
    userMiddleware.passwordLength,
    userMiddleware.idNotFound,
    userController.updateUser
  )
  .delete(
    '/:id',
    userMiddleware.idNotFound,
    userController.deleteUser
  );

export default {
  router,
};
