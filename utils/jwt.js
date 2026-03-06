const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'default_secret_key';

function generar(user){
    return jwt.sign(
        {id: user.id, username: user.username, role: user.role},
        SECRET, {expiresIn: "1h"}
    );
}
function verificar(token) {return jwt.verify(token, SECRET);}

module.exports = {generar, verificar};