import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const teamsMock = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
];

const teamMock = {
  "id": 3,
  "teamName": "Botafogo",
}

describe('Testing /teams endpoint', () => {
  let chaiHttpResponse: Response;
  afterEach(()=>{
    sinon.restore();
  })

  it('return all teams', async () => {
    sinon
    .stub(Team, "findAll")
    .resolves(
      teamsMock as Team[]);
      chaiHttpResponse = await chai.request(app).get('/teams');
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock);
  });

  it('return team by id', async () => {
    sinon
    .stub(Team, "findByPk")
    .resolves(
      teamMock as Team);
      chaiHttpResponse = await chai.request(app).get('/teams/3');
    expect(chaiHttpResponse.body).to.be.deep.equal(teamMock);
  });
});
