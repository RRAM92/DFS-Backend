const jwt = require('jsonwebtoken');
const SECRET = 'default_secret_key';

function generarToken(user){
    return jwt.sign(
        {id: user.id, username: user.username, role: user.role}, 
        SECRET, 
        {expiresIn: "1h"}
    );
}

function verificarToken(token) {return jwt.verify(token, SECRET);}

module.exports = { generarToken, verificarToken };