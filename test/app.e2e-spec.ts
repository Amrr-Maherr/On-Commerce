import request from 'supertest';
import { app } from '../src/app.js';

describe('AppController (e2e)', () => {
  it('GET /api/v1 returns Hello World!', async () => {
    const response = await request(app).get('/api/v1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, data: 'Hello World!' });
  });

  it('returns a 404 response for an unknown route', async () => {
    const response = await request(app).get('/api/v1/unknown');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Cannot GET /api/v1/unknown',
      error: 'Not Found',
      statusCode: 404,
    });
  });
});
