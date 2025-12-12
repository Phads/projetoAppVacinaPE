const Profissional = require('../models/ProfissionalSaude');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { cpf, email, senha } = req.body; 

  const filtro = cpf ? { cpf } : { email };
  
  const profissional = await Profissional.findOne(filtro);

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

  res.json({
    token,
    profissional: {
      id: profissional._id,
      nome: profissional.nome,
      email: profissional.email,
      cpf: profissional.cpf,
      coren: profissional.coren, 
      cargo: profissional.cargo, 
    }
  });
};