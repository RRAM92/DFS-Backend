const repo = require("../repositories/turnos.repository");

async function getTurnos(req, res, next){
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.page) || 5;
        const turnos = await repo.leer(page, limit);
        res.json({
            page,
            limit,
            count: turnos.length,
            data: turnos
        });
    } catch(err){next(err);}
}

async function postTurnos(req, res, next){
    try {
        const {nombreCliente, servicio} = req.body;
        const turno = repo.crear(nombreCliente, servicio);
        res.status(201).json(turno);
    }catch(err){next(err);}
}

async function putTurnos(req, res, next){
    try {
        const id = parseInt(req.params.id);
        const {status} = req.body;
        const turno = repo.cambiar(id, status);
        if (!turno){
            const error = new Error("TURNO NO ENCONTRADO");
            error.status = 404;
            return next(error);
        }
        res.json(turno);
    }catch(err){next(err);}
}

async function delTurnos(req, res, next){
    try{
        const id = parseInt(req.params.id);
        const ok = repo.eliminar(id);
        if (!ok){
            const error = new Error("TURNO NO ENCONTRADO");
            error.status = 404;
            return next(error);
        }
        res.json({mensaje: "ELIMINADO"});
    }catch(err){next(err);}
}

module.exports = {getTurnos, postTurnos, putTurnos, delTurnos};