function validarTurno(req, res, next) {
    const { nombreCliente, servicio } = req.body;
    if (!nombreCliente || !servicio) {return res.status(400).json({ error: "Por favor ingrese nombre del cliente y servicio que lo atiende" });}
    next();
}

module.exports = { validarTurno };