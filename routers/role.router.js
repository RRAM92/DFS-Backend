const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const {validarPostTurno, validarPutTurno} = require("../middleware/validation.middleware");
const ctrl = require("../controllers/turnos.controller");

router.get("/", auth, role(["cliente", "empleado", "admin"]), ctrl.getTurnos);
router.post("/", auth, role(["empleado", "admin"]), ctrl.postTurnos);
router.put("/:id", auth, role(["empleado", "admin"]), ctrl.putTurnos);
router.delete("/:id", auth, role(["admin"]), ctrl.delTurnos);

module.exports = router;