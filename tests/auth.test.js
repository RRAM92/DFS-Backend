const request = require('supertest');
const app = require('../main');

describe('Auth - /auth', () => {

    test('POST /auth/registrar - debe registrar un usuario nuevo', async () => {
        const res = await request(app)
            .post('/auth/registrar')
            .send({ username: 'testuser_' + Date.now(), password: 'test123', role: 'user' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'REGISTRADO');
    });

    test('POST /auth/registrar - debe fallar si faltan datos', async () => {
        const res = await request(app)
            .post('/auth/registrar')
            .send({ username: 'solousuario' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    test('POST /auth/login - debe fallar con usuario inexistente', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'noexiste_xyz', password: '1234' });
        expect(res.statusCode).toBe(404);
    });

    test('POST /auth/login - debe fallar sin datos', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({});
        expect(res.statusCode).toBe(400);
    });

});
