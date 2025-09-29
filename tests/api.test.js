const request = require('supertest');
const app = require('../index');

describe('API Endpoints', () => {

  it('should return welcome message POST /hello', async () => {
    const res = await request(app)
      .post('/hello')
      .expect(200);

    expect(res.body.message).toBe('Welcome to the Student and Course Management API');
    expect(res.body.date).toBeDefined();
  })

  it('should create a new student POST /student', async () => {

    const timestamp = Date.now();

    const newStudent = {
      firstName: 'John',
      lastName: 'Doe',
      email: `alice${timestamp}@example.com`,
      age: 20,
      grade: 'A'
    };

    const res = await request(app)
      .post('/student')
      .send(newStudent)
      .expect(201);

    expect(res.body).toMatchObject(newStudent);

  })

});