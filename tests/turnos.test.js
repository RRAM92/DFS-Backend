const request = require('supertest');
const app = require('../main');

let token = '';
const testUser = { username: 'admin_test_' + Date.now(), password: 'admin123', role: 'admin' };

beforeAll(async () => {
    // Registrar y hacer login para obtener token
    await request(app).post('/auth/registrar').send(testUser);
    const res = await request(app).post('/auth/login').send({
        username: testUser.username,
        password: testUser.password
    });
    token = res.body.token;
});

describe('Turnos - /turnos', () => {

    test('GET /turnos - debe requerir token', async () => {
        const res = await request(app).get('/turnos');
        expect(res.statusCode).toBe(401);
    });

    test('GET /turnos - debe listar turnos con token válido', async () => {
        const res = await request(app)
            .get('/turnos')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    test('POST /turnos - debe crear un turno', async () => {
        const res = await request(app)
            .post('/turnos')
            .set('Authorization', `Bearer ${token}`)
            .send({ nombreCliente: 'Cliente Test', servicio: 'Servicio Test' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('nombreCliente', 'Cliente Test');
        expect(res.body).toHaveProperty('status', 'PENDIENTE');
    });

    test('POST /turnos - debe fallar si faltan datos', async () => {
        const res = await request(app)
            .post('/turnos')
            .set('Authorization', `Bearer ${token}`)
            .send({ nombreCliente: 'Solo nombre' });
        expect(res.statusCode).toBe(400);
    });

});
