require('dotenv').config();
const mongoose = require('mongoose');

// MODELS
const Paciente = require('../models/Paciente');
const ProfissionalSaude = require('../models/ProfissionalSaude');
const Vacina = require('../models/Vacina');

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
      unidadeSaude: 'Policlínica Rio Doce IV - Olinda/PE',
      coren: '11122',
    });

    const profissional2 = await ProfissionalSaude.create({
      nome: 'Pedro Henrique Alves da Silva',
      cpf: '10203040506',
      email: 'pedro@gmail.com',
      senha: '654321',
      unidadeSaude: 'Policlínica Rio Doce IV - Olinda/PE',
      coren: '123456-PE-EN',
    });

    // PACIENTE
    const paciente = await Paciente.create({
      cns: '123456789012345',
      nomeCompleto: 'Maria da Silva',
      cpf: '11122233344',
      nomeMae: 'Josefa Silva',
      dataNascimento: new Date('2002-05-19'),
      telefone: '81999999999',
      email: 'maria@gmail.com',
    });

    const vacinas = [
      // --- ESTAS DEVEM APARECER (Pendentes) ---
      {
        paciente: paciente._id,
        nome: 'HEPATITE B',
        dose: '1ª Dose',
        tipo: 'Rotina',
        status: 'Pendente', 
        observacoes: 'Tomar na unidade mais próxima'
      },
      {
        paciente: paciente._id,
        nome: 'FEBRE AMARELA',
        dose: 'Reforço',
        tipo: 'Rotina',
        status: 'Pendente', 
        observacoes: 'Viajante para área de risco'
      },

      // --- ESTAS NÃO DEVEM APARECER (Já Aplicadas) ---
      {
        paciente: paciente._id,
        nome: 'ANTITETÂNICA',
        dose: 'Reforço 10 anos',
        tipo: 'Rotina',
        status: 'Aplicada', 
        fabricante: 'Fiocruz',
        lote: 'AB1234',
        dataAplicacao: new Date('2023-01-10')
      },
      {
        paciente: paciente._id,
        nome: 'COVID-19',
        dose: 'Dose Única',
        tipo: 'Campanha',
        status: 'Aplicada',
        fabricante: 'Pfizer',
        lote: 'PF9988',
        dataAplicacao: new Date('2024-02-20')
      }
    ];


    console.log('Seed executado com sucesso');
    console.log('Paciente:', paciente.nomeCompleto);
    await Vacina.insertMany(vacinas);
    console.log(`${vacinas.length} vacinas cadastradas com sucesso!`);
    console.log('Profissional:', profissional.nome);
    console.log('Profissional:', profissional2.nome);

    process.exit();
  } catch (error) {
    console.error('Erro ao rodar seed:', error);
    process.exit(1);
  }
}

seed();
