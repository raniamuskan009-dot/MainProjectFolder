const request = require('supertest');
const app = require('../app'); // Adjust path if needed
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('POST /api/contact/send', () => {
    it('should send contact email', async () => {
        const res = await request(app)
            .post('/api/contact/send')
            .send({ name: 'Test', email: 'test@example.com', subject: 'Inquiry', message: 'Hello' });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Email sent successfully');
    });
});

describe('PATCH /api/destinations/:id', () => {
    it('should update destination', async () => {
        // Assume a test destination ID and token
        const testId = 'testDestinationId';
        const token = 'validJWTToken';
        const res = await request(app)
            .patch(`/api/destinations/${testId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ description: 'Updated description' });
        expect(res.status).toBe(200);
    });
});