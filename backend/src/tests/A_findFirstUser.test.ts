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

  describe('Se o campo name for preenchido corretamente', () => {
    let findUser: sinon.SinonStub;
    const userPayload =   {
      id: 1110,
      email: 'julio_santos@email.com',
      name: 'Júlio Ramiro dos Santos',
      password: '12345678'
    };
    const loginPayload = {
      find: [
        {
          id: userPayload.id,
          email: 'julio_santos@email.com',
          name: 'Júlio Ramiro dos Santos',
          password: '12345678'
        },
      ],
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
        .get('/user/search?name=Júlio')
        .set('X-API-Key', 'foobar');

      const bodyFind = chaiHttpResponse.body.find[0];
      expect(chaiHttpResponse).to.have.status(StatusCode.OK);
      expect(bodyFind.name).to.deep.equal(loginPayload.find[0].name);
      expect(bodyFind.email).to.deep.equal(loginPayload.find[0].email);
      expect(bodyFind.password).to.deep.equal(loginPayload.find[0].password);
    });
  });

  describe('Se o campo for preenchido com um usuário que não está no banco de dados', () => {
    const loginPayload = {
      find: []
    };
    it('Retorna com status 200 e um array vazio', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/user/search?name=abcdefgh')
         .set('X-API-Key', 'foobar');
        
      expect(chaiHttpResponse).to.have.status(StatusCode.OK);
      expect(chaiHttpResponse.body.find[0]).to.deep.equal(loginPayload.find[0]);
    });
  });
});
