const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./enrutadores/auth');
const turnosRoutes = require('./enrutadores/turnos');
const gestionarErrores = require('./middleware/gestorErrores');
const moni = require('./enrutadores/moni');

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/turnos', turnosRoutes);
app.use('/currency', moni);
app.use(gestionarErrores);

module.exports = app;
