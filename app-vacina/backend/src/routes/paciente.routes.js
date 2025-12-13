const router = require('express').Router();
const { buscarPorCpf } = require('../controllers/pacienteController');
const pacienteController = require('../controllers/pacienteController');

router.get('/cpf/:cpf', buscarPorCpf);
router.post('/qrcode', pacienteController.salvarPacienteQrCode);
router.get('/:cns', pacienteController.buscarPorCns);

module.exports = router;
