const express = require("express");
const router = express.Router();
const {registrar, login} = require("../controllers/auth.controller");
const {validarRegistro, validarLogin} = require("../middleware/validation.middleware");

router.post("/register", registrar);
router.post("/login", login);

module.exports = router;