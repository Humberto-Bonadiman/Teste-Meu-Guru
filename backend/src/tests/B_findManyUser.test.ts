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

describe('Testar a rota "user/search/:page" com GET', () => {
  let chaiHttpResponse: Response;
  describe('Se ao chamar pela rota GET com "user/search/0" mostra até 10 usuários', () => {
    let findUser: sinon.SinonStub;
    before(() => {
      const prisma = new PrismaClient();
      findUser = sinon.stub(prisma.user, 'findMany').resolves(mockUser);
    });
    after( async () => {
      findUser.restore();
    });

    it('Retorna até 10 usuários com status 200', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/user/search/0')
        .set('X-API-Key', 'foobar');

      expect(chaiHttpResponse).to.have.status(StatusCode.OK);
      expect(chaiHttpResponse.body.find).to.have.length.lessThanOrEqual(10);
      expect(chaiHttpResponse.body.find[0]).to.deep.equal(mockUser[0]);
    });
  })
});
