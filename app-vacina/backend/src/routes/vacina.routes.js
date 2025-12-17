const express = require('express');
const router = require('express').Router();

const { aplicarVacina } = require('../controllers/vacinaController');

const vacinaController = require('../controllers/vacinaController');

router.post('/aplicar', aplicarVacina);

router.get('/', vacinaController.listarTodas);

module.exports = router;
