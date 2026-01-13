const request = require('supertest');
const app = require('../index');

describe('API Health Check', () => {
  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toContain('Car Marketplace');
  });
});

describe('Authentication Endpoints', () => {
  test('POST /api/auth/register should create new user', async () => {
    const userData = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123',
      phone: '0501234567',
      city: 'الرياض'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('token');
  });

  test('POST /api/auth/login should authenticate user', async () => {
    // First register a user
    const userData = {
      name: 'Login Test',
      email: `logintest${Date.now()}@example.com`,
      password: 'password123',
      phone: '0501234567',
      city: 'الرياض'
    };

    await request(app)
      .post('/api/auth/register')
      .send(userData);

    // Then login
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: userData.email,
        password: userData.password
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('token');
  });
});
