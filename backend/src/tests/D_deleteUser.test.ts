import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import StatusCode from '../enums/StatusCode';
import { app } from '../index';
import { Response } from 'superagent';
import { PrismaClient } from '@prisma/client';
import { mockUser } from './mockUser';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testar a rota "/user/:id" com DELETE', () => {
  let chaiHttpResponse: Response;

  describe('Se o id informado não estiver no banco de dados', () => {
    it(`Retorna o erro com status 404 e a mensagem informando que o usuário não foi encontrado`, async () => {
      chaiHttpResponse = await chai
        .request(app)
        .delete('/user/12345')
        .set('X-API-Key', 'foobar');

      expect(chaiHttpResponse).to.have.status(StatusCode.NOT_FOUND);
      expect(chaiHttpResponse.body.message).to.be.equal('Id not found');
    });
  });

  describe('Se o id informado estiver no banco de dados', () => {
    let deleteUser: sinon.SinonStub;

    before(() => {
      const prisma = new PrismaClient();
      deleteUser = sinon.stub(prisma.user, 'delete').resolves({
          id: 11,
          email: "julio_santos@email.com",
          name: "Júlio Ramiro dos Santos",
          password : "12345678"
      });
    });

    after( async () => {
      deleteUser.restore();
    });

    it('Retorna com status 200 e informa os dados do usuário deletado', async () => {
      it(`Retorna o erro com status 404 e a mensagem informando que o usuário não foi encontrado`, async () => {
        chaiHttpResponse = await chai
          .request(app)
          .delete('/user/11')
          .set('X-API-Key', 'foobar');
  
        expect(chaiHttpResponse).to.have.status(StatusCode.OK);
        expect(chaiHttpResponse.body.message).to.be.equal(mockUser[0]);
      });
    });
  });
});