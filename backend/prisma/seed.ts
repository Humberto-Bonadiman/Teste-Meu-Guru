import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

const users: User[] = [
  {
    id: 11,
    name: 'Júlio Ramiro dos Santos',
    email: 'julio_santos@email.com',
    password: '12345678'
  },
  {
    id: 12,
    name: 'Gustavo Inácio Almeida',
    email: 'gustavo_almeida@email.com',
    password: '12345678'
  },
  {
    id: 13,
    name: 'Lucas Becker Azevedo',
    email: 'lucas_azevedo@email.com',
    password: '12345678'
  }
];

async function userSeed() {
  const resultUser = users.map(async (usercreate) => {
    const response = await prisma.user.upsert({
      where: { id: usercreate.id },
      update: {},
      create: {
        ...usercreate
      },
    });

    return response;
  });

  await Promise.all(resultUser);
};

userSeed().catch((e) => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});