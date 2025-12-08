const mongoose = require('mongoose');

const AplicacaoSchema = new mongoose.Schema({
  vacina: { type: mongoose.Schema.Types.ObjectId, ref: 'Vacina' },
  profissional: { type: mongoose.Schema.Types.ObjectId, ref: 'ProfissionalSaude' },

  fabricante: {
    type: String,
    enum: [
      'Instituto Butantan',
      'Fiocruz',
      'Pfizer/Wyeth',
      'AstraZeneca',
      'Janssen',
      'Sanofi'
    ]
  },

  doseAplicada: {
    type: String,
    enum: [
      '1ª', '2ª', '3ª',
      '1º reforço', '2º reforço',
      'dose única', 'dose adicional'
    ]
  },

  localAplicacao: {
    type: String,
    enum: [
      'braço direito', 'braço esquerdo',
      'coxa direita', 'coxa esquerda',
      'glúteo', 'boca'
    ]
  },

  observacoes: String,

  dataAplicacao: { type: Date, default: Date.now },
  unidadeSaude: String
});

module.exports = mongoose.model('AplicacaoVacina', AplicacaoSchema);
