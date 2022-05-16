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
  .get('/', userController.findAllUser)
  .get(
    '/specific',
    userMiddleware.withoutEmail,
    userMiddleware.withoutPassword,
    userMiddleware.invalidEmail,
    userController.findUser
  )
  .put('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser);

export default {
  router,
};
