const request = require('supertest');
const app = require('../main');

describe('Middleware - Autenticación y Roles', () => {

    test('Sin token debe devolver 401', async () => {
        const res = await request(app).get('/turnos');
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('error', 'TOKEN REQUERIDO');
    });

    test('Token inválido debe devolver 401', async () => {
        const res = await request(app)
            .get('/turnos')
            .set('Authorization', 'Bearer token_falso_123');
        expect(res.statusCode).toBe(401);
    });

    test('DELETE sin rol admin debe devolver 403', async () => {
        // Registrar usuario normal
        const user = { username: 'user_test_' + Date.now(), password: '1234', role: 'user' };
        await request(app).post('/auth/registrar').send(user);
        const loginRes = await request(app).post('/auth/login').send({ username: user.username, password: user.password });
        const userToken = loginRes.body.token;

        const res = await request(app)
            .delete('/turnos/1')
            .set('Authorization', `Bearer ${userToken}`);
        expect(res.statusCode).toBe(403);
    });

});
