const {clima} = require("../repositories/api.repository");

async function getClima(req, res, next){
    try{
        const ciudad = req.query.ciudad || "Chihuahua";
        const data = await clima(ciudad);
        
        res.json({
            ciudad: data.name,
            temperatura: data.main.temp,
            descripcion: data.weather[0].descripcion
        });
    } catch(err){
        err.status = 500;
        err.message = "ERROR";
        next(err);
    }
}

module.exports = {getClima};