import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import StatusCode from '../enums/StatusCode';
import { app } from '../index';
import { Response } from 'superagent';
import { PrismaClient } from '@prisma/client';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testar a rota "/user/specific" com GET', () => {
  let chaiHttpResponse: Response;

  describe('Se o campo email e o campo password forem preenchidos corretamente', () => {
    let findUser: sinon.SinonStub;
    const userPayload =   {
      id: 11,
      email: 'julio_santos@email.com',
      name: 'Júlio Ramiro dos Santos',
      password: '12345678'
    };
    const loginPayload = {
      find: {
        id: userPayload.id,
        email: 'julio_santos@email.com',
        name: 'Júlio Ramiro dos Santos',
        password: '12345678'
      },
    };
  
    before(() => {
      const prisma = new PrismaClient();
      findUser = sinon.stub(prisma.user, 'findMany');
      findUser.resolves(userPayload);
    });
    after( async () => {
      findUser.restore();
    });
  
    it('Retorna o usuário encontrado', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/user/specific')
        .set('X-API-Key', 'foobar')
        .send({ name: 'Júlio Ramiro dos Santos' });

      const bodyFind = chaiHttpResponse.body.find;
      expect(chaiHttpResponse).to.have.status(StatusCode.OK);
      expect(bodyFind.name).to.deep.equal(loginPayload.find.name);
      expect(bodyFind.email).to.deep.equal(loginPayload.find.email);
      expect(bodyFind.password).to.deep.equal(loginPayload.find.password);
    });
  });

  describe('Se o campo name estiver vazio', () => {
    it('Retorna o erro  com status 401 e a mensagem "name" is required', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/user/specific')
         .set('X-API-Key', 'foobar')
         .send({ });
        
      expect(chaiHttpResponse).to.have.status(StatusCode.UNAUTHORIZED);
      expect(chaiHttpResponse.body.message).to.be.equal('Name is required');
    });
  });
});
