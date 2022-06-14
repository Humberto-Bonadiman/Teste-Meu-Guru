import { Request, Response } from 'express';
import userService from '../services/userService';
import StatusCode from '../enums/StatusCode';

const NOTFOUND = 'Incorrect email or password';

const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  const create = await userService.createUser(user);
  return res.status(StatusCode.OK).json({ create });
};

const findAllUser = async (_req: Request, res: Response) => {
  const findAll = await userService.findAllUser();
  return res.status(StatusCode.OK).json({ findAll });
}

const findUser = async (req: Request, res: Response) => {
  const { name } = req.body;
  const find = await userService.findUser(name);
  if (find === null) {
    return res.status(StatusCode.NOT_FOUND).json({ message: NOTFOUND });
  };
  return res.status(StatusCode.OK).json({ find });
};

const findUserByPagination = async (req: Request, res: Response) => {
  const { page } = req.params;
  const find = await userService.findUserByPagination(Number(page));
  return res.status(StatusCode.OK).json({ find });
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.body;
  
    const update = await userService.updateUser(Number(id), user);
    return res.status(StatusCode.OK).json({ update });
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
  findAllUser,
  findUser,
  findUserByPagination,
  createUser,
  updateUser,
  deleteUser,
};
