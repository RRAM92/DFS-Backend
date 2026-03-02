let users = [];
let nextUserId = 1;

function crearUsuario(username, password, role){
    const user = {id: nextUserId++, username, password, role};
    users.push(user);
    return user;
}
function buscarUsuario(username) {return users.find(u => u.username === username);}

module.exports = {crearUsuario, buscarUsuario};