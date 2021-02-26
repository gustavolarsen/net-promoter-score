import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database';

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it('Deve criar um novo usiario', async () => {
    const response = await request(app).post('/users').send({
      email: 'user@test.com',
      name: 'User Test',
    });

    expect(response.status).toBe(201);
  });

  it('Não pode permitir criar usuarios com emails iguais', async () => {
    const response = await request(app).post('/users').send({
      email: 'user@test.com',
      name: 'User Test',
    });

    expect(response.status).toBe(409);
  });
});
