const express = require('express');
const router = express.Router();
const {crearTurno, listarTurnos, actualizarTurno, eliminarTurno} = require('../controladores/turnos');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');
const {validarTurno} = require('../middleware/validacion');

router.get('/', authMiddleware, listarTurnos);
router.post('/', authMiddleware, validarTurno, crearTurno);
router.put('/:id', authMiddleware, actualizarTurno);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), eliminarTurno);

module.exports = router;