import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

const users: User[] = [
  {
    id: 11,
    email: 'julio_santos@email.com',
    name: 'Júlio Ramiro dos Santos',
    password: '12345678'
  },
  {
    id: 12,
    email: 'gustavo_almeida@email.com',
    name: 'Gustavo Inácio Almeida',
    password: '12345678'
  },
  {
    id: 13,
    email: 'lucas_azevedo@email.com',
    name: 'Lucas Becker Azevedo',
    password: '12345678'
  },
  {
    id: 14,
    email: 'tiago_ramos@email.com',
    name: 'Tiago Gonçalves Ramos',
    password: '12345678'
  },
  {
    id: 15,
    email: 'luis_albuquerque@email.com',
    name: 'Luís Fernando Albuquerque',
    password: '12345678'
  },
  {
    id: 16,
    email: 'pedro_teixeira@email.com',
    name: 'Pedro Costa Teixeira',
    password: '12345678'
  },
  {
    id: 17,
    email: 'renata_martins@email.com',
    name: 'Renata Martins da Silva',
    password: '12345678'
  },
  {
    id: 18,
    email: 'nicole_silveira@email.com',
    name: 'Nicole Silveira Bragança',
    password: '12345678'
  },
  {
    id: 19,
    email: 'leticia_heck@email.com',
    name: 'Leticia Heck Cotrim',
    password: '12345678'
  },
  {
    id: 20,
    email: 'hugo_batista@email.com',
    name: 'Hugo Souza Batista',
    password: '12345678'
  },
  {
    id: 21,
    email: 'laila_brito@email.com',
    name: 'Laila Costa Brito',
    password: '12345678'
  },
  {
    id: 22,
    email: 'vitor_silveira@email.com',
    name: 'Vitor Ruiz Silveira',
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