const mongoose = require('mongoose');

const PacienteSchema = new mongoose.Schema(
  {
    cns: {
      type: String,
      required: true,
      unique: true,
    },
    nomeCompleto: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    nomeMae: String,
    dataNascimento: { type: Date, required: true },
    telefone: String,
    email: String,
    vacinas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vacina' }]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

PacienteSchema.virtual('idade').get(function () {
  if (!this.dataNascimento) return null;
  const hoje = new Date();
  let idade = hoje.getFullYear() - this.dataNascimento.getFullYear();
  const m = hoje.getMonth() - this.dataNascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < this.dataNascimento.getDate())) idade--;
  return idade;
});

module.exports = mongoose.model('Paciente', PacienteSchema);

