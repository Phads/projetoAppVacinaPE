const mongoose = require('mongoose');

const PacienteSchema = new mongoose.Schema({
  cpf: { type: String, unique: true, required: true },
  nomeCompleto: String,
  dataNascimento: Date,
  idade: Number,
  nomeMae: String,
  telefone: String,
  email: String
});

module.exports = mongoose.model('Paciente', PacienteSchema);
