import { Request, Response } from 'express';
import userService from '../services/userService';
import StatusCode from '../enums/StatusCode';

const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  const create = await userService.createUser(user);
  return res.status(StatusCode.OK).json({ create });
};

export default {
  createUser,
};
