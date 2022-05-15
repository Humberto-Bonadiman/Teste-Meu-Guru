import { PrismaClient } from '@prisma/client';
import { UserI } from '../interfaces/user';

const prisma = new PrismaClient();

const createUser = (user: UserI) => {
  const { name, email, password } = user;
  const create = prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  return create;
};


export default {
  createUser,
};
