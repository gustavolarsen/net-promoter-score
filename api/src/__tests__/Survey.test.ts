import { getConnection } from 'typeorm';
import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe('Surveys', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it('Deve criar uma nova pesquisa', async () => {
    const response = await request(app).post('/surveys').send({
      title: 'Title Test',
      description: 'Description test',
    });

    expect(response.status).toBe(201);
  });
});
