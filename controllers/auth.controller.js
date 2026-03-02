const {crearUsuario, buscarUsuario} = require("../repositories/users.repository");
const {generarToken} = require("../utils/jwt");

function registrar(req, res){
    const {username, password, role} = req.body;
    if (buscarUsuario(username)){
        return res.status(400).json({error: "USUARIO YA EXISTENTE. INGRESE OTRA IDENTIDAD."});
        error.status = 400;
        return next(error);
    }
    const user = crearUsuario(username, password, role);
    res.status(201).json({mensaje: "USUARIO CREADO", user});
}

function login(req, res){
    const {username, password} = req.body;
    const user = buscarUsuario(username);
    if (!user || user.password !== password){
        return res.status(401).json({error: "DEPORTADO"});
        error.status = 401;
        return next(error);
    }
    const token = generarToken(user);
    res.json({token});
}

module.exports = {registrar, login};