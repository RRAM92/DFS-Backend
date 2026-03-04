const {generar} = require('../utils/jwt');
const {crear, buscar, validar} = require('../repositorios/users');

function registrar(req, res){
    const {username, password, role} = req.body;
    if(!username || !password || !role){return res.status(400).json({error: "DATOS INCOMPLETOS: Por favor ingrese usuario, contraseña y rol"});}
    if(buscar(username)){return res.status(400).json({error: "USUARIO EXISTENTE"});}
    const user = crear(username, password, role);
    return res.status(201).json({message: "REGISTRADO", user});
}
async function login(req, res){
    const {username, password} = req.body;
    if(!username || !password){return res.status(400).json({error: "Por favor ingrese Usuario y Contraseña"});}
    const user = buscar(username);
    if(!user){return res.status(404).json({error: "USUARIO NO ENCONTRADO"});}
    const isitvalid = await validar(user, password);
    if(!isitvalid){return res.status(401).json({error: "INVÁLIDO"});}
    
    const token = generar({id: user.id, role: user.role});
    return res.json({token});
}

module.exports = {registrar, login};