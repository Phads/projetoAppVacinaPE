const mongoose = require('mongoose');

const VacinaSchema = new mongoose.Schema({
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente' },
  nome: String,
  tipo: { type: String, enum: ['ROTINA', 'CAMPANHA'] },
  doseIndicada: String, // anual, semestral, reforço...
  status: { type: String, enum: ['APLICADA', 'PENDENTE'] }
});

module.exports = mongoose.model('Vacina', VacinaSchema);
