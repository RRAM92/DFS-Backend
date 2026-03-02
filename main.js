const express = require('express');
const app = express();
const errorHandler = require("./middleware/error.middleware");

app.use(express.json());
app.use("/auth", require("./routers/auth.router"));
app.use("/turnos", require("./routers/role.router"));
app.use("/clima", require("./routers/api.router"));
app.use(errorHandler);

module.exports = app;