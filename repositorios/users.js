let users = [];
let nextUserId = 1;

function crear(username, password, role){
    const user = {id: nextUserId++, username, password, role};
    users.push(user);
    return user;
}
function buscar(username){return users.find(u => u.username === username);}
async function validar(user, password){
    return user.password === password;
}

module.exports = {crear, buscar, validar};