import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import StatusCode from '../enums/StatusCode';
import { app } from '../index';
import { Response } from 'superagent';
import { PrismaClient } from '@prisma/client';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testar a rota "user/" com PUT', () => {
  let chaiHttpResponse: Response;
  describe('Se o campo name estiver vazio', () => {
    it('Retorna o erro  com status 401 e a mensagem "name" is required', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .put('/user/12')
         .set('X-API-Key', 'foobar')
         .send({
            email: 'gustavo_almeida@email.com',
            password: '12345678'
          });
        
      expect(chaiHttpResponse).to.have.status(StatusCode.UNAUTHORIZED);
      expect(chaiHttpResponse.body.message).to.be.equal('Name is required');
    });
  });

  describe('Se o campo email estiver vazio', () => {
    it('Retorna o erro  com status 401 e a mensagem "email" is required', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .put('/user/12')
         .set('X-API-Key', 'foobar')
         .send({
            name: 'Gustavo Inácio Almeida',
            password: '12345678'
          });
        
      expect(chaiHttpResponse).to.have.status(StatusCode.UNAUTHORIZED);
      expect(chaiHttpResponse.body.message).to.be.equal('Email is required');
    });
  });

  describe('Se o campo password estiver vazio', () => {
    it('Retorna o erro  com status 401 e a mensagem "password" is required', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .put('/user/12')
         .set('X-API-Key', 'foobar')
         .send({
            email: 'gustavo_almeida@email.com',
            name: 'Gustavo Inácio Almeida',
          });
        
      expect(chaiHttpResponse).to.have.status(StatusCode.UNAUTHORIZED);
      expect(chaiHttpResponse.body.message).to.be.equal('Password is required');
    });
  });

  describe('Se o campo email estiver com email inválido', () => {
    it('Retorna o erro  com status 401 e a mensagem Format of email is invalid', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .put('/user/12')
        .set('X-API-Key', 'foobar')
        .send({
          email: 'gustavo_almeida@.com',
          name: 'Gustavo Inácio Almeida',
          password: '12345678'
        });

      expect(chaiHttpResponse).to.have.status(StatusCode.UNAUTHORIZED);
      expect(chaiHttpResponse.body.message).to.be.equal('Format of email is invalid');
    });
  });

  describe('Se o campo name estiver com nome inválido', () => {
    it('Retorna o erro  com status 401 e a mensagem com nome menor que 8 caracteres', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .put('/user/12')
        .set('X-API-Key', 'foobar')
        .send({
          email: 'gustavo_almeida@email.com',
          name: 'Gusta',
          password: '12345678'
        });

      expect(chaiHttpResponse).to.have.status(StatusCode.UNAUTHORIZED);
      expect(chaiHttpResponse.body.message).to.be.equal('Name must be longer than 8 characters');
    });
  });

  describe('Se o campo password estiver com senha inválido', () => {
    it('Retorna o erro  com status 401 e a mensagem com senha menor que 6 caracteres', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .put('/user/12')
        .set('X-API-Key', 'foobar')
        .send({
          email: 'gustavo_almeida@email.com',
          name: 'Gustavo Inácio Almeida',
          password: '123'
        });

      expect(chaiHttpResponse).to.have.status(StatusCode.UNAUTHORIZED);
      expect(chaiHttpResponse.body.message).to.be.equal('Password must be longer than 6 characters');
    });
  });

  describe('Se o id não for informado', () => {
    it(`Retorna o erro com status 404 e a mensagem informando que o usuário não foi encontrado`, async () => {
      chaiHttpResponse = await chai
        .request(app)
        .put('/user/12345')
        .set('X-API-Key', 'foobar')
        .send({
          email: 'gustavo_almeida@email.com',
          name: 'Gustavo Inácio Almeida',
          password: '12345678'
        });

      expect(chaiHttpResponse).to.have.status(StatusCode.NOT_FOUND);
      expect(chaiHttpResponse.body.message).to.be.equal('Id not found');
    });
  });

  describe('Quando os dados fornecidos estão corretos', () => {
    let updateUser: sinon.SinonStub;

    before(() => {
      const prisma = new PrismaClient();
      updateUser = sinon.stub(prisma.user, 'updateMany').resolves({ count: 1 });
    });

    after( async () => {
      updateUser.restore();
    });

    it('Retorna o status 200 com os dados alterados', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .put('/user/12')
        .set('X-API-Key', 'foobar')
        .send({
          email: 'gustavo_inacio@email.com',
          name: 'Gustavo Inácio Almeida',
          password: '12345678910'
        });

      expect(chaiHttpResponse).to.have.status(StatusCode.OK);
      expect(chaiHttpResponse.body.update).to.deep.equal({ count: 1 });
    });
  });
});