const express = require('express');
const router = express.Router();
const {comparar} = require('../controladores/moni');

router.get('/convert', comparar);

module.exports = router;