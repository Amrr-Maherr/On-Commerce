import request from 'supertest';
import { app } from './app.js';

describe('AppController', () => {
  it('should return "Hello World!"', async () => {
    const response = await request(app).get('/api/v1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, data: 'Hello World!' });
  });
});
