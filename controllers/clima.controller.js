const axios = require("axios");

app.get("/clima", async (req, res) => {
  try {
    const ciudad = req.query.ciudad || "Chihuahua";
    const apiKey = process.env.OPENWEATHER_KEY;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Error al consultar clima" });
  }
});
