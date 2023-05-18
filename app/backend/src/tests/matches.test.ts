import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import matchesList from './mocks/matches';

import { Response } from 'superagent';
import statusCodes from '../utils/statusCodes';

chai.use(chaiHttp);

const { expect } = chai;

const token = "eyJhbGciOiJIUzI1NiJ9.dXNlckB1c2VyLmNvbQ.8yAUgfpLRsTuqgg-Yj3YeO66h8PxSQdx1y641jX4JpM";

describe('Testing /matches endpoint', () => {
  let chaiHttpResponse: Response;
  afterEach(()=>{
    sinon.restore();
  })

  it('return all matches', async () => {
    sinon
    .stub(Match, "findAll")
    .resolves(
      matchesList as unknown as Match[]);
      chaiHttpResponse = await chai.request(app).get('/matches');
    expect(chaiHttpResponse.status).to.be.equal(statusCodes.ok);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesList);
  });

  it('return all matches in progress', async () => {
    sinon
    .stub(Match, "findAll")
    .resolves(
      matchesList[1] as unknown as Match[]);
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
    
    expect(chaiHttpResponse.status).to.be.equal(statusCodes.ok);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesList[1]);
  });

  it('update match', async () => {
    sinon
    .stub(Match, "update")
    .resolves();
      chaiHttpResponse = await chai.request(app).patch('/matches/41/finish').set({ 'Authorization': token });
    
    expect(chaiHttpResponse.status).to.be.equal(statusCodes.ok);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Finished' });
  });

});
