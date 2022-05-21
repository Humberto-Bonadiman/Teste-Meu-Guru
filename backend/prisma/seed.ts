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
  },
  {
    id: 23,
    email: 'lais_gambin@email.com',
    name: 'Laís Steffen Gambin',
    password: '12345678'
  },
  {
    id: 24,
    email: 'vitoria_consts@email.com',
    name: 'Vitória Melo Consts',
    password: '12345678'
  },
  {
    id: 25,
    email: 'hugo_silveira@email.com',
    name: 'Hugo Melo Silveira',
    password: '12345678'
  },
  {
    id: 26,
    email: 'nicolau_binsfeld@email.com',
    name: 'Nicolau Batista Binsfeld',
    password: '12345678'
  },
  {
    id: 27,
    email: 'azelindo_bonadiman@email.com',
    name: 'Azelindo Alberto Bonadiman',
    password: '12345678'
  },
  {
    id: 28,
    email: 'arlindo_gomes@email.com',
    name: 'Arlindo da Silva Gomes',
    password: '12345678',
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