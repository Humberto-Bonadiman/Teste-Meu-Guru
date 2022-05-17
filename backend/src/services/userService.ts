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

const findAllUser = (page: number) => {
  if (page === 0) {
    const User = prisma.user.findMany({
      take: 10,
    });
  
    return User;
  }
  const skipUsers = 10 * page;
  const User = prisma.user.findMany({
    skip: skipUsers,
    take: 10,
  });

  return User;
}

const findUser = (email: string, password: string) => {
  const User = prisma.user.findFirst({
    where: {
      email,
      password,
    },
  });

  return User;
};

const updateUser = (idNumber: number, user: UserI) => {
  try {
    const { email, name, password } = user;
    const User = prisma.user.updateMany({
      data: {
        email,
        name,
        password,
      },
      where: { id: idNumber } },
    );
  
    return User;
  } catch (error) {
    throw error;
  }
};

const deleteUser = (id: number) => {
  const User = prisma.user.delete({
    where: { id },
  });

  return User;
}

export default {
  createUser,
  findUser,
  findAllUser,
  updateUser,
  deleteUser,
};
