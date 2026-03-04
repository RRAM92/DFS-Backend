const {verificar} = require("../utils/jwt");

function authMiddleware(req, res, next){
    const header = req.headers.authorization;
    if(!header) return res.status(401).json({error: "TOKEN REQUERIDO"});
    const token = header.split(" ")[1];
    
    try{
        const decoded = veridicar(token);
        req.user = decoded;
        next();
    }catch(err) {return res.status(401).json({error: "INVÁLIDO"});}
}

module.exports = authMiddleware;