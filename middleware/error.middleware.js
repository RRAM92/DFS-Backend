function errorHandler(err, req, res, next){
    console.error("ERROR: ", err);
    const status = err.status || 500;
    const message = err.message || "ERROR INTERNO";
    res.status(status).json({ error: message });
}

module.exports = errorHandler;