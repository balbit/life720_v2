import request from 'supertest';
import { app } from '../index'; // Assuming your Express app is exported from app.ts

describe('API Tests', () => {
  let userId1: string;
  let userId2: string;

  describe('POST /api/v1/createUser', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/v1/createUser')
        .send({ name: 'User 1' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id');
      userId1 = res.body.id;
    });
  });

  describe('POST /api/v1/createUser', () => {
    it('should create another user', async () => {
      const res = await request(app)
        .post('/api/v1/createUser')
        .send({ name: 'User 2' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id');
      userId2 = res.body.id;
    });
  });

  describe('POST /api/v1/addFriend', () => {
    it('should add a friend', async () => {
      const res = await request(app)
        .post('/api/v1/addFriend')
        .send({ userID: userId1, friend: userId2 });

      expect(res.status).toBe(200);
    });

    it('should return 404 for invalid user ID', async () => {
      const res = await request(app)
        .post('/api/v1/addFriend')
        .send({ userID: 'invalidId', friend: userId2 });

      expect(res.status).toBe(404);
      expect(res.text).toBe('User not found');
    });
  });

  describe('POST /api/v1/sendLocation', () => {
    it('should send location', async () => {
      const res = await request(app)
        .post('/api/v1/sendLocation')
        .send({ userID: userId1, locationInfo: { latitude: 40.7128, longitude: -74.0060 } });

      expect(res.status).toBe(200);
    });

    it('should return 404 for invalid user ID', async () => {
      const res = await request(app)
        .post('/api/v1/sendLocation')
        .send({ userID: 'invalidId', locationInfo: { latitude: 40.7128, longitude: -74.0060 } });

      expect(res.status).toBe(404);
      expect(res.text).toBe('User not found');
    });
  });

  describe('GET /api/v1/getLocation', () => {
    it('should get location', async () => {
      const res = await request(app)
        .get('/api/v1/getLocation')
        .query({ userID: userId1 });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('locations');
      expect(Array.isArray(res.body.locations)).toBe(true);
    });

    it('should return 404 for invalid user ID', async () => {
      const res = await request(app)
        .get('/api/v1/getLocation')
        .query({ userID: 'invalidId' });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });
  });
});