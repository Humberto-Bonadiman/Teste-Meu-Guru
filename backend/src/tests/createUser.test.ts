import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import StatusCode from '../enums/StatusCode';
import { app } from '../index';
import { Response } from 'superagent';
import { PrismaClient } from '@prisma/client';

chai.use(chaiHttp);
const { expect } = chai;
const prisma = new PrismaClient();


describe('Testar a rota "/user" com POST', () => {
  let chaiHttpResponse: Response;
  describe('Se o campo name estiver vazio', () => {
    it('Retorna o erro  com status 401 e a mensagem "name" is required', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/user')
         .set('X-API-Key', 'foobar')
         .send({ email: "gustavo_santos@email.com", password: '12345678' });
        
      expect(chaiHttpResponse).to.have.status(StatusCode.UNAUTHORIZED);
      expect(chaiHttpResponse.body.message).to.be.equal('Name is required');
    });
  });

  describe('Se o campo email estiver vazio', () => {
    it('Retorna o erro  com status 401 e a mensagem "email" is required', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/user')
         .set('X-API-Key', 'foobar')
         .send({ name: "Gustavo da Silva Santos", password: '12345678' });
        
      expect(chaiHttpResponse).to.have.status(StatusCode.UNAUTHORIZED);
      expect(chaiHttpResponse.body.message).to.be.equal('Email is required');
    });
  });

  describe('Se o campo password estiver vazio', () => {
    it('Retorna o erro  com status 401 e a mensagem "password" is required', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/user')
         .set('X-API-Key', 'foobar')
         .send({ name: "Gustavo da Silva Santos", email: "gustavo_santos@email.com" });
        
      expect(chaiHttpResponse).to.have.status(StatusCode.UNAUTHORIZED);
      expect(chaiHttpResponse.body.message).to.be.equal('Password is required');
    });
  });

  describe('Se o campo email estiver com email inválido', () => {
    it('Retorna o erro  com status 401 e a mensagem Format of email is invalid', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/user')
        .set('X-API-Key', 'foobar')
        .send({
          name: "Gustavo da Silva Santos",
          email: "gustavo_santos@com",
          password: "12345678"
        });

      expect(chaiHttpResponse).to.have.status(StatusCode.UNAUTHORIZED);
      expect(chaiHttpResponse.body.message).to.be.equal('Format of email is invalid');
    });
  });

  describe('Se o campo name estiver com nome inválido', () => {
    it('Retorna o erro  com status 401 e a mensagem com nome menor que 8 caracteres', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/user')
        .set('X-API-Key', 'foobar')
        .send({
          name: "Gusta",
          email: "gustavo_santos@email.com",
          password: "12345678"
        });

      expect(chaiHttpResponse).to.have.status(StatusCode.UNAUTHORIZED);
      expect(chaiHttpResponse.body.message).to.be.equal('Name must be longer than 8 characters');
    });
  });

  describe('Se o campo password estiver com senha inválido', () => {
    it('Retorna o erro  com status 401 e a mensagem com senha menor que 6 caracteres', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/user')
        .set('X-API-Key', 'foobar')
        .send({
          name: "Gustavo da Silva Santos",
          email: "gustavo_santos@email.com",
          password: "1234"
        });

      expect(chaiHttpResponse).to.have.status(StatusCode.UNAUTHORIZED);
      expect(chaiHttpResponse.body.message).to.be.equal('Password must be longer than 6 characters');
    });
  });

  describe('Se os campos forem preenchidos corretamente', () => {
    let createUser: sinon.SinonStub;
    const userPayload = {
      id: 100,
      name: 'Gustavo da Silva Santos',
      email: "gustavo_santos@email.com",
      password: "12345678"
    };
    const loginPayload = {
      create: {
        id: userPayload.id,
        name: 'Gustavo da Silva Santos',
        email: "gustavo_santos@email.com",
        password: "12345678"
      },
    };

    before(() => {
      createUser = sinon.stub(prisma.user, 'create').resolves(userPayload)
    });
    after( async () => {
      const deleteUsers = prisma.user.deleteMany();
      await prisma.$transaction([deleteUsers]);
      await prisma.$disconnect();
    });

    it('Retorna o usuário criado', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/user')
        .set('X-API-Key', 'foobar')
        .send({
          name: 'Gustavo da Silva Santos',
          email: "gustavo_santos@email.com",
          password: '12345678'
        });


      const bodyCreate = chaiHttpResponse.body.create;
      expect(chaiHttpResponse).to.have.status(StatusCode.OK);
      expect(bodyCreate.name).to.deep.equal(loginPayload.create.name);
      expect(bodyCreate.email).to.deep.equal(loginPayload.create.email);
      expect(bodyCreate.password).to.deep.equal(loginPayload.create.password);
    });
  });
});

describe('Testar a rota "/user/specific" com GET', () => {
  let chaiHttpResponse: Response;
  describe('Se o campo email estiver vazio', () => {
    it('Retorna o erro  com status 401 e a mensagem "email" is required', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/user/specific')
         .set('X-API-Key', 'foobar')
         .send({ password: '12345678' });
        
      expect(chaiHttpResponse).to.have.status(StatusCode.UNAUTHORIZED);
      expect(chaiHttpResponse.body.message).to.be.equal('Email is required');
    });
  });

  describe('Se o campo password estiver vazio', () => {
    it('Retorna o erro  com status 401 e a mensagem "password" is required', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/user/specific')
         .set('X-API-Key', 'foobar')
         .send({ email: "gustavo_santos@email.com" });
        
      expect(chaiHttpResponse).to.have.status(StatusCode.UNAUTHORIZED);
      expect(chaiHttpResponse.body.message).to.be.equal('Password is required');
    });
  });

  describe('Se o campo email estiver com email inválido', () => {
    it('Retorna o erro  com status 401 e a mensagem Format of email is invalid', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/user/specific')
        .set('X-API-Key', 'foobar')
        .send({
          email: "gustavo_santos@com",
          password: "12345678"
        });

      expect(chaiHttpResponse).to.have.status(StatusCode.UNAUTHORIZED);
      expect(chaiHttpResponse.body.message).to.be.equal('Format of email is invalid');
    });
  });

  describe('Se o campo email ou o campo password forem preenchidos incorretamente', () => {
    let findUser: sinon.SinonStub;
    const userPayload = {
      id: 100,
      name: 'Lucas da Silva Santos',
      email: "Lucas_santos@email.com",
      password: "12345678"
    };
    const loginPayload = {
      find: {
        id: userPayload.id,
        name: 'Lucas da Silva Santos',
        email: "Lucas_santos@email.com",
        password: "12345678"
      },
    };

    before(() => {
      findUser = sinon.stub(prisma.user, 'findFirst').resolves(userPayload)
    });
    after( async () => {
      const deleteUsers = prisma.user.deleteMany();
      await prisma.$transaction([deleteUsers]);
      await prisma.$disconnect();
    });

    it('Retorna o erro com status 404 e a mensagem Incorrect email or password', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/user/specific')
        .set('X-API-Key', 'foobar')
        .send({
          email: "Lu_santos@email.com",
          password: "12345678"
        });

      expect(chaiHttpResponse).to.have.status(StatusCode.NOT_FOUND);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });
  });

  /* describe('Se o campo email e o campo password forem preenchidos corretamente', () => {
    let findUser: sinon.SinonStub;
    const userPayload = {
      id: 100,
      name: 'Lucas da Silva Santos',
      email: "Lucas_santos@email.com",
      password: "12345678"
    };
    const loginPayload = {
      find: {
        id: userPayload.id,
        name: 'Miguel da Silva Santos',
        email: "Miguel_santos@email.com",
        password: "12345678"
      },
    };

    before(() => {
      findUser = sinon.stub(prisma.user, 'findFirst').resolves(userPayload)
    });
    after( async () => {
      const deleteUsers = prisma.user.deleteMany();
      await prisma.$transaction([deleteUsers]);
      await prisma.$disconnect();
    });

    it('Retorna o usuário encontrado', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/user/specific')
        .set('X-API-Key', 'foobar')
        .send({
          email: "Miguel_santos@email.com",
          password: "12345678"
        });

      const bodyFind = chaiHttpResponse.body.find;
      expect(chaiHttpResponse).to.have.status(StatusCode.OK);
      expect(bodyFind.name).to.deep.equal(loginPayload.find.name);
      expect(bodyFind.email).to.deep.equal(loginPayload.find.email);
      expect(bodyFind.password).to.deep.equal(loginPayload.find.password);
    });
  }); */
});