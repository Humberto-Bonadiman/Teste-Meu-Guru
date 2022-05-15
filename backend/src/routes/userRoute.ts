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
    userController.createUser
  )
  .get(
    '/',
    userMiddleware.withoutEmail,
    userMiddleware.withoutPassword,
    userMiddleware.invalidEmail,
    userController.findUser
  );

export default {
  router,
};