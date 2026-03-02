function roleMiddleware(ciudadanos){
    return (req, res, next) => {
        if(!ciudadanos.includes(req.user.role)) return res.status(403).json({error: "DENEGADO"});
        next();
    };
}

module.exports = roleMiddleware;