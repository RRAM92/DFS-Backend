let turnos = [];
let nextId = 0;

async function leer(page, limit){
    const offset = (page - 1) * limit;
    const {data, error} = await supabase
            .from("turnos")
            .select("*")
            .order("id", {ascending: true})
            .range(offset, offset + limit - 1); //NOTA MENTAL: CREAR ENV PARA SUPABASE
    if (error) throw error;
    return data;
}

async function crear(nombreCliente, servicio){
    const turno = {
        id: nextId++,
        nombreCliente,
        servicio,
        status: 'PENDIENTE',
        horaLlegada: new Date().toLocaleString("es-MX", {dateStyle: "short", timeStyle: "short"})
    };
    turnos.push(turno);
    return turno;
}

async function cambiar(id, status){
    const turno = turnos.find(t => t.id === id);
    if (!turno) return null;
    turno.status = status;
    return turno;
}

async function eliminar(id){
    const index = turnos.findIndex(t => t.id === id);
    if (index === -1) return false;
    turnos.splice(index, 1);
    return true;
}

module.exports = {leer, crear, cambiar, eliminar};