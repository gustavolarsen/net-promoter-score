import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
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
