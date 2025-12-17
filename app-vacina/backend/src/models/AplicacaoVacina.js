const mongoose = require('mongoose');

const AplicacaoSchema = new mongoose.Schema({
  vacina: { type: mongoose.Schema.Types.ObjectId, ref: 'Vacina' },
  profissional: { type: mongoose.Schema.Types.ObjectId, ref: 'ProfissionalSaude' },
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente' },

  fabricante: {
    type: String,
    enum: [
      'Butantan',
      'Fiocruz',
      'Pfizer',
      'AstraZeneca',
      'Janssen',
      'Sanofi'
    ]
  },

  doseAplicada: {
    type: String,
    enum: [
      '1ª Dose',
      '2ª Dose',
      '3ª Dose',
      '1º Reforço',
      '2º Reforço',
      'Dose Única',
      'Dose Adicional'
    ]
  },

  viaAplicacao: {
    type: String,
    enum: [
        'Intramuscular',
        'Oral',
        'Subcutanea',
        'Intradermica'
    ]
  },

  localAplicacao: {
    type: String,
    enum: [
      'Braço Direito',
      'Braço Esquerdo',
      'Vasto Lateral Direito', 
      'Vasto Lateral Esquerdo',
      'Glúteo',
      'Boca',
      'Padrao' 
    ]
  },

  observacoes: String,

  dataAplicacao: { type: Date, default: Date.now },
  unidadeSaude: String
});

module.exports = mongoose.model('AplicacaoVacina', AplicacaoSchema);