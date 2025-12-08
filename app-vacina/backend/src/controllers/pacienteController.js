const Paciente = require('../models/Paciente');
const Vacina = require('../models/Vacina');
const Aplicacao = require('../models/AplicacaoVacina');

exports.buscarPorCpf = async (req, res) => {
  const { cpf } = req.params;

  const paciente = await Paciente.findOne({ cpf });
  if (!paciente) {
    return res.status(404).json({ erro: 'Paciente não encontrado' });
  }

  const vacinas = await Vacina.find({ paciente: paciente._id });
  const aplicacoes = await Aplicacao.find()
    .populate('vacina')
    .populate('profissional');

  res.json({
    paciente,
    cartaoVacinacao: {
      vacinasIndicadas: vacinas.filter(v => v.status === 'PENDENTE'),
      vacinasAplicadas: vacinas.filter(v => v.status === 'APLICADA'),
      historicoAplicacoes: aplicacoes
    }
  });
};
