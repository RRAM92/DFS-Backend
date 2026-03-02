function validarRegistro(req, res, next){
    const {username, password, role} = req.body;
    if(!username || !password || !role) return res.status(400).json({error: "POR FAVOR INGRESE: Usuario, Contraseña y Rol"});
    const rolesValidos = ["admin", "empleado", "cliente"];
    if(!rolesValidos.includes(role)) return res.status(400).json({error: "INVÁLIDO. Debe ser ADMIN, EMPLEADO, O CLIENTE"});
    next();
}
function validarLogin(req, res, next){
    const {username, password} = req.body;
    if(!username || !password) return res.status(400).json({error: "POR FAVOR INGRESE Usuario y Contraseña"});
    next();
}
function validarPostTurno(req, res, next){
    const {nombreCliente, servicio} = req.body;
    if(!nombreCliente || !servicio) return res.status(400).json({error: "Favord e ingresar nombre del cliente y especificar servicio"});
    next();
}
function validarPutTurno(req, res, next){
    const {status} = req.body;
    const estadosValidos = ["PENDIENTE", "ATENDIENDO", "ATENDIDO"];
    if(!status) return res.status(400).json({error: "Favor de ingresar estado"});
    if(!estadosValidos.includes(status)) return res.status(400).json({error: "INVÁLIDO. INGRESE PENDIENTE, ATENDIENDO O ANTENDIDO EN MAYÚSCULAS."});
    next();
}

module.exports = {validarRegistro, validarLogin, validarPostTurno, validarPutTurno};