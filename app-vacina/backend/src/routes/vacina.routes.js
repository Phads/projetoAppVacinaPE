const router = require('express').Router();
const { aplicarVacina } = require('../controllers/vacinaController');

router.post('/aplicar', aplicarVacina);

module.exports = router;
