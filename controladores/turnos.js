const { crear, leer, actualizar, eliminar } = require('../repositorios/turnos');

function crearTurno(req, res) {
    const { nombreCliente, servicio } = req.body;
    if (!nombreCliente || !servicio) {
        return res.status(400).json({ error: "Por favor ingrese nombre del cliente y servicio que lo atiende" });
    }
    const turno = crear(nombreCliente, servicio);
    return res.status(201).json(turno);
}

async function listarTurnos(req, res) {
    const {page = 1, limit = 5} = req.query;
    try {
        const turnos = await leer(page, limit);
        res.json({
            page: parseInt(page),
            limit: parseInt(limit),
            data: turnos
        });
    } catch (error) {
        res.status(500).json({error: "Error al obtener turnos"});
    }
}

function actualizarTurno(req, res) {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const turno = actualizar(id, status);
    if (!turno) {
        return res.status(404).json({ error: "INVÁLIDO" });
    }
    return res.json(turno);
}

function eliminarTurno(req, res) {
    const id = parseInt(req.params.id);
    const eliminado = eliminar(id);
    if (!eliminado) {
        return res.status(404).json({ error: "TURNO NO ENCONTRADO" });
    }
    return res.json({ message: "ELIMINADO" });
}

module.exports = {crearTurno, listarTurnos, actualizarTurno, eliminarTurno};