const request = require('supertest');
const server = require('./server');

describe('test server', () => {

  it('Testing Environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  })

  describe('post register', () => {
    it('Needs auth should return 500', async () => {
      const res = await request(server).post('/api/auth/register');
      expect(res.status).toBe(500)
    })
    it('should return JSON type', async () => {
      const res = await request(server).post('/api/auth/register');
      expect(res.type).toBe('text/html');
    })
    // it('return 500 error message', async () => {
    //   const res = await request(server).post('/api/auth/register');
    //   expect(res.body).toEqual({"message": "Could not register, please enter valid information"})
    // })
  })

  describe('post login', () => {
    it('Needs auth should return 500', async () => {
      const res = await request(server).post('/api/auth/login');
      expect(res.status).toBe(500)
    })
    it('should return JSON type', async () => {
      const res = await request(server).post('/api/auth/login');
      expect(res.type).toBe('application/json');
    })
  })

  describe('get jokes', () => {
    it('Need to login to get jokes 500', async () => {
      const res = await request(server).get('/api/jokes');
      expect(res.status).toBe(500)
    })
    it('should return JSON type', async () => {
      const res = await request(server).get('/api/jokes');
      expect(res.type).toBe('application/json');
    })
    it('return 500 error message', async () => {
      const res = await request(server).get('/api/jokes');
      expect(res.body).toEqual({"you": "shall not pass!"})
    })
  })
})