const pool = require('../db'); // conexión a PostgreSQL

let turnos = [];
let nextId = 1;

function crear(nombreCliente, servicio){
    const turno = {
        id: nextId++,
        nombreCliente,
        servicio,
        status: "PENDIENTE",
        horaLlegada: new Date().toLocaleString("es-MX", {dateStyle: "short", timeStyle: "short"})
    };
    turnos.push(turno);
    return turno;    
}

async function leer(page = 1, limit = 5) {
    const offset = (page - 1) * limit;
    const query = 'SELECT * FROM turnos ORDER BY id LIMIT $1 OFFSET $2';
    const values = [limit, offset];
    const result = await pool.query(query, values);
    return result.rows;
}

function actualizar(id, status){
    const turno = turnos.find(t => t.id === id);
    const estadosValidos = ["PENDIENTE", "ATENDIENDO", "ATENDIDO"];
    if(!turno || !estadosValidos.includes(status)){return null;}
    turno.status = status;
    return turno;
}

function eliminar(id){
    const index = turnos.findIndex(t => t.id === id);
    if(index === -1){return false;}
    turnos.splice(index,1);
    return true;
}

module.exports = {crear, leer, actualizar, eliminar};