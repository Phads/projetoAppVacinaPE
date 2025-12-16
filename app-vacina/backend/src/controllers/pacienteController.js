const Paciente = require('../models/Paciente');
const Vacina = require('../models/Vacina');
const Aplicacao = require('../models/AplicacaoVacina');

exports.buscarPorCpf = async (req, res) => {
  const { cpf } = req.params;

  const paciente = await Paciente.findOne({ cpf });
  if (!paciente) {
    return res.status(404).json({ erro: 'Paciente não encontrado' });
  }

  const vacinas = await Vacina.find({ paciente: paciente._id });
  const aplicacoes = await Aplicacao.find()
    .populate('vacina')
    .populate('profissional');

  res.json({
    paciente,
    cartaoVacinacao: {
      vacinasIndicadas: vacinas.filter(v => v.status === 'PENDENTE'),
      vacinasAplicadas: vacinas.filter(v => v.status === 'APLICADA'),
      historicoAplicacoes: aplicacoes
    }
  });
};

exports.salvarPacienteQrCode = async (req, res) => {
    try {
        console.log("Controller recebendo:", req.body.nome);

        const { cns, nome, dataNascimento, nomeMae, telefone, email } = req.body;

        if (!cns || !nome) {
            return res.status(400).json({ error: "CNS e Nome são obrigatórios." });
        }

        let dataFormatada = dataNascimento;
        if (dataNascimento && typeof dataNascimento === 'string' && dataNascimento.includes('/')) {
            const partes = dataNascimento.split('/');
            if (partes.length === 3) {
                dataFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;
            }
        }

        let paciente = await Paciente.findOne({ cns: cns });

        if (paciente) {
            console.log("✅ Paciente encontrado no banco. Retornando...");
            return res.status(200).json({ message: "Paciente já cadastrado.", paciente });
        } 
        
        console.log("Paciente não encontrado. Criando novo...");

        const cpfProvisorio = req.body.cpf || `000.${Math.floor(Math.random() * 999)}.${Math.floor(Math.random() * 999)}-00`;

        paciente = await Paciente.create({
            cns,
            nomeCompleto: nome,
            dataNascimento: dataFormatada,
            cpf: cpfProvisorio, 
            nomeMae,
            telefone,
            email
        });

        return res.status(201).json({ message: "Cadastrado com sucesso!", paciente });

    } catch (error) {
        console.error("ERRO NO CONTROLLER:", error);
        return res.status(500).json({ error: error.message });
    }
};

exports.buscarPorCns = async (req, res) => {
    try {
        const { cns } = req.params;
        console.log("Buscando paciente pelo CNS:", cns);

        const paciente = await Paciente.findOne({ cns: cns });

        if (!paciente) {
            return res.status(404).json({ error: "Paciente não encontrado." });
        }

        const vacinas = await Vacina.find({ paciente: paciente._id });

        const aplicacoes = await Aplicacao.find({ paciente: paciente._id })
            .populate('vacina')
            .populate('profissional');

        return res.status(200).json({
            paciente, // Dados pessoais
            cartaoVacinacao: {
                vacinasIndicadas: vacinas.filter(v => v.status === 'PENDENTE'),
                vacinasAplicadas: vacinas.filter(v => v.status === 'APLICADA'),
                historicoAplicacoes: aplicacoes
            }
        });

    } catch (error) {
        console.error("Erro ao buscar paciente:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};
