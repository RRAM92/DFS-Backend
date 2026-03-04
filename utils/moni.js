const fetch = require('node-fetch');

async function dinero(from, to, amount){
    const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
    
    try{
        const response = await fetch(url);
        if(!response.ok){throw new Error(`ERROR: ${response.statusText}`);}
        const data = await response.json();
        return {from, to, amount, result: data.result};
    }catch(error){throw error;}
}

module.exports = {dinero};