const router = require('express').Router();
const { buscarPorCpf } = require('../controllers/pacienteController');

router.get('/cpf/:cpf', buscarPorCpf);

module.exports = router;
