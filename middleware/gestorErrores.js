function gestionarErrores(err, req, res, next) {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || "ERROR INTERNO: Vuelva más tarde";
    res.status(status).json({ error: message });
}

module.exports = gestionarErrores;