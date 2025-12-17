const express = require('express');
const bcrypt = require('bcryptjs');
const Profissional = require('../models/ProfissionalSaude');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Dados obrigatórios' });
  }

  const profissional = await Profissional.findOne({ email });
  if (!profissional) {
    return res.status(401).json({ message: 'Email ou senha inválidos' });
  }

  const senhaValida = await bcrypt.compare(senha, profissional.senha);
  if (!senhaValida) {
    return res.status(401).json({ message: 'Email ou senha inválidos' });
  }

  return res.json({
    id: profissional._id,
    nome: profissional.nome,
    email: profissional.email,
    coren: profissional.coren,
    unidade: profissional.unidadeSaude,
  });
});

module.exports = router;
