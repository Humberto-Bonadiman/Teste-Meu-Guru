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

const findAllUser = async (req: Request, res: Response) => {
  const { page } = req.params;
  const find = await userService.findAllUser(Number(page));
  return res.status(StatusCode.OK).json({ find });
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.body;
  
    const update = await userService.updateUser(Number(id), user);
    return res.status(StatusCode.NO_CONTENT).json({ update });
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.deleteUser(Number(id));
  return res.status(StatusCode.OK).json({ user });
}

export default {
  findUser,
  findAllUser,
  createUser,
  updateUser,
  deleteUser,
};
