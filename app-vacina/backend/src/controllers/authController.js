const Profissional = require('../models/ProfissionalSaude');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { cpf, senha } = req.body;

  const profissional = await Profissional.findOne({ cpf });
  if (!profissional) {
    return res.status(401).json({ erro: 'Usuário não encontrado' });
  }

  const senhaValida = await bcrypt.compare(senha, profissional.senha);
  if (!senhaValida) {
    return res.status(401).json({ erro: 'Senha inválida' });
  }

  const token = jwt.sign(
    { id: profissional._id },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({ token, profissional });
};
