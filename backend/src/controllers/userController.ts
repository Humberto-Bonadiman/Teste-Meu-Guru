import { Request, Response } from 'express';
import userService from '../services/userService';
import StatusCode from '../enums/StatusCode';

const NOTFOUND = 'Incorrect email or password';

const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  const create = await userService.createUser(user);
  return res.status(StatusCode.CREATED).json({ create });
};

const findUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const find = await userService.findUser(email, password);
  if (find === null) {
    return res.status(StatusCode.NOT_FOUND).json({ message: NOTFOUND });
  }
  return res.status(StatusCode.OK).json({ find });
}

export default {
  findUser,
  createUser,
};
