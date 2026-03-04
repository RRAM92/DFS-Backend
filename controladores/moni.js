const {dinero} = require('../utils/moni');

async function comparar(req, res){
    const {from, to, amount} = req.query;
    if(!from || !to || !amount) return res.status(400).json({error: "Por favor especifique moneda que tiene, moneda que bica convertir y la cantidad que busca comparar."});
    try{
        const conversion = await dinero(from, to, amount);
        res.json(conversion);
    }
    catch(error){res.status(500).json({error: error.message});}
}

module.exports = {comparar};