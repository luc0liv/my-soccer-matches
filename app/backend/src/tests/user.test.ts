import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing /login endpoint', () => {
  let chaiHttpResponse: Response;
  afterEach(()=>{
    sinon.restore();
  })

  it('login should return a token', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'user@user.com',
        password: 'secret_user'
      });

    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.have.property('token');
    expect(chaiHttpResponse.body.token).to.be.a('string');
  });
});


