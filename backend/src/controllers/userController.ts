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
  };
  return res.status(StatusCode.OK).json({ find });
};

const findAllUser = async (_req: Request, res: Response) => {
  const find = await userService.findAllUser();
  return res.status(StatusCode.OK).json({ find });
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.body;

  const update = await userService.updateUser(Number(id), user);
  return res.status(StatusCode.OK).json({ update });
}

export default {
  findUser,
  findAllUser,
  createUser,
  updateUser,
};
