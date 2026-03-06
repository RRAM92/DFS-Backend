const supabase = require('../db');

async function crear(nombreCliente, servicio) {
    const { data, error } = await supabase
        .from('turnos')
        .insert([{
            nombreCliente,
            servicio,
            status: 'PENDIENTE',
            horaLlegada: new Date().toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' })
        }])
        .select()
        .single();
    if (error) throw new Error(error.message);
    return data;
}

async function leer(page = 1, limit = 5) {
    const offset = (page - 1) * limit;
    const { data, error } = await supabase
        .from('turnos')
        .select('*')
        .order('id', { ascending: true })
        .range(offset, offset + limit - 1);
    if (error) throw new Error(error.message);
    return data;
}

async function actualizar(id, status) {
    const estadosValidos = ['PENDIENTE', 'ATENDIENDO', 'ATENDIDO'];
    if (!estadosValidos.includes(status)) return null;
    const { data, error } = await supabase
        .from('turnos')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
    if (error) return null;
    return data;
}

async function eliminar(id) {
    const { error } = await supabase
        .from('turnos')
        .delete()
        .eq('id', id);
    if (error) return false;
    return true;
}

module.exports = { crear, leer, actualizar, eliminar };
