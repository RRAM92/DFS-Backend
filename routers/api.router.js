const express = require("express");
const router = express.Router();
const {getClima} = require("../controllers/clima.controller");
router.get("/", getClima);
module.exports = router;