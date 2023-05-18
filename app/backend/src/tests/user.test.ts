import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing /login endpoint', () => {
  let chaiHttpResponse: Response;
  afterEach(() => {
    sinon.restore();
  });

  it('login should return a token', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'user@user.com',
      password: 'secret_user',
    });

    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.have.property('token');
    expect(chaiHttpResponse.body.token).to.be.a('string');
  });

  it('login should have all fields', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'user@user.com',
    });

    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.a('string');
    expect(chaiHttpResponse.body.message).to.be.equal(
      'All fields must be filled'
    );
  });

  it('login should have valid data', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'useasdasdasd',
      password: 'dsasd3w',
    });

    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.a('string');
    expect(chaiHttpResponse.body.message).to.be.equal(
      'Invalid email or password'
    );
  });

  it('login should have valid data', async () => {
    sinon.stub(User, 'findOne').resolves(null)
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'lu@email.com',
      password: 'd123sds433',
    });

    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.a('string');
    expect(chaiHttpResponse.body.message).to.be.equal(
      'Invalid email or password'
    );
  });

  it('get role', async () => {
    chaiHttpResponse = await chai.request(app).post('/login/role').send({
      email: 'user@user.com',
    });

    expect(chaiHttpResponse.body).to.be.a('object');
});
})