const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ProfissionalSchema = new mongoose.Schema({
  nome: String,
  cpf: { type: String, unique: true },
  email: String,
  senha: String,
  unidadeSaude: String,
  coren: {type: String, required: true, trim: true},
});

ProfissionalSchema.pre('save', async function () {
  this.senha = await bcrypt.hash(this.senha, 10);
});

module.exports = mongoose.model('ProfissionalSaude', ProfissionalSchema);
