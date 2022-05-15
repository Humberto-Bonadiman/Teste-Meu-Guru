import { PrismaClient } from '@prisma/client';
import { UserI } from '../interfaces/user';

const prisma = new PrismaClient();

const createUser = (user: UserI) => {
  const { name, email, password } = user;
  const User = prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  return User;
};

const findUser = (email: string, password: string) => {
  const User = prisma.user.findFirst({
    where: {
      email,
      password,
    },
  });

  return User;
};

export default {
  createUser,
  findUser,
};
