import { NextFunction, Request, Response } from 'express';
import StatusCode from '../enums/StatusCode';
import { PrismaClient } from '@prisma/client';
import { UserI } from '../interfaces/user';

const prisma = new PrismaClient();

const isEmailValid = (email: string) => {
  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regexEmail.test(email);
};

const NAME = 'Name is required';
const EMAIL = 'Email is required';
const PASSWORD = 'Password is required';
const INVALIDEMAIL = 'Format of email is invalid';
const INVALIDNAME = 'Name must be longer than 8 characters';
const INVALIDPASSWORD = 'Password must be longer than 6 characters';
const ALREADYEXIST = 'User already exist';
const IDNOTFOUND = 'Id not found';

const withoutName = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body as UserI;
  if (!name) {
    return res.status(StatusCode.UNAUTHORIZED).json({ message: NAME });
  }

  next();
};

const withoutEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body as UserI;
  if (!email) {
    return res.status(StatusCode.UNAUTHORIZED).json({ message: EMAIL });
  };

  next();
};

const withoutPassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body as UserI;
  if (!password) {
    return res.status(StatusCode.UNAUTHORIZED).json({ message: PASSWORD });
  }

  next();
};

const invalidEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body as UserI;
  if (isEmailValid(email) === false) {
    return res.status(StatusCode.UNAUTHORIZED).json({ message: INVALIDEMAIL });
  };

  next();
};

const nameLength = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body as UserI;
  if (name.length <= 8) {
    return res.status(StatusCode.UNAUTHORIZED).json({ message: INVALIDNAME });
  };

  next();
};

const passwordLength = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body as UserI;
  if (password.length <= 6) {
    return res.status(StatusCode.UNAUTHORIZED).json({ message: INVALIDPASSWORD });
  };

  next();
};

const checkUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body as UserI;
  const user = await prisma.user.findUnique({
    where: {
      email,
    }
  });

  if (user !== null) {
    return res.status(StatusCode.UNAUTHORIZED).json({ message: ALREADYEXIST });
  }

  next();
};

const idNotFound = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const user = await prisma.user.findFirst({
    where: { id: Number(id) },
  });
  if (user === null) {
    return res.status(StatusCode.NOT_FOUND).json({ message: IDNOTFOUND });
  };

  return next();
};

export default {
  withoutName,
  withoutEmail,
  withoutPassword,
  invalidEmail,
  nameLength,
  passwordLength,
  checkUser,
  idNotFound,
};
