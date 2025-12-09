require('dotenv').config();
const mongoose = require('mongoose');

// MODELS
const Paciente = require('../models/Paciente');
const ProfissionalSaude = require('../models/ProfissionalSaude');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Conectado ao MongoDB');

    await Paciente.deleteMany();
    await ProfissionalSaude.deleteMany();

    // PROFISSIONAL DE SAÚDE
    const profissional = await ProfissionalSaude.create({
      nome: 'Ítalo José Tavares Pessoa',
      cpf: '12604913402',
      email: 'tavares.italo@outlook.com',
      senha: '123456',
      unidadeSaude: 'Policlínica Rio Doce IV - Olinda/PE'
    });

    // PACIENTE
    const paciente = await Paciente.create({
      nomeCompleto: 'Maria da Silva',
      cpf: '11122233344',
      nomeMae: 'Josefa Silva',
      dataNascimento: new Date('2002-05-19'),
      telefone: '81999999999',
      email: 'maria@gmail.com',
      cartaoVacinacao: {
        vacinas: [
          {
            nome: 'Influenza',
            dose: 'Anual',
            tipo: 'Rotina',
            status: 'Aplicada'
          },
          {
            nome: 'Hepatite B',
            dose: 'Reforço',
            tipo: 'Rotina',
            status: 'Pendente'
          }
        ]
      }
    });

    console.log('Seed executado com sucesso');
    console.log('Paciente:', paciente.nomeCompleto);
    console.log('Profissional:', profissional.nome);

    process.exit();
  } catch (error) {
    console.error('Erro ao rodar seed:', error);
    process.exit(1);
  }
}

seed();
