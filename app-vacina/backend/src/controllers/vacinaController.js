const Aplicacao = require('../models/AplicacaoVacina');
const Vacina = require('../models/Vacina');

exports.aplicarVacina = async (req, res) => {
  const {
    vacinaId,
    profissionalId,
    fabricante,
    doseAplicada,
    localAplicacao,
    observacoes,
    unidadeSaude
  } = req.body;

  const aplicacao = await Aplicacao.create({
    vacina: vacinaId,
    profissional: profissionalId,
    fabricante,
    doseAplicada,
    localAplicacao,
    observacoes,
    unidadeSaude
  });

  await Vacina.findByIdAndUpdate(vacinaId, { status: 'APLICADA' });

  res.json(aplicacao);
};
