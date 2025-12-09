const mongoose = require('mongoose');

const VacinaSchema = new mongoose.Schema({
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente' }, // opcional
  nome: { type: String, required: true },
  dose: String,
  tipo: String,
  status: { type: String, enum: ['Aplicada', 'Pendente'], default: 'Pendente' },
  fabricante: String,
  lote: String,
  dataAplicacao: Date,
  observacoes: String
});

module.exports = mongoose.model('Vacina', VacinaSchema);
