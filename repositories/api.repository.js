const axios = require("axios");

async function clima(ciudad){
    const apiKey = process.env.OPENWEATHER_KEY; //NOTA MENTAL: CREAR ENV PARA SUPABASE Y OPENWEATHER
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;
    const response = await axios.get(url);
    return response.data;
}

module.exports = {clima};