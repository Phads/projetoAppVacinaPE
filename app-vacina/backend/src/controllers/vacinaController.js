const Aplicacao = require('../models/AplicacaoVacina');
const Vacina = require('../models/Vacina');

exports.aplicarVacina = async (req, res) => {
    try {
        const {
            vacinaId,
            profissionalId,
            fabricante,
            doseAplicada,
            localAplicacao,
            observacoes,
            unidadeSaude
        } = req.body;

        const aplicacao = await Aplicacao.create({
            vacina: vacinaId,
            profissional: profissionalId,
            fabricante,
            doseAplicada,
            localAplicacao,
            observacoes,
            unidadeSaude
        });

        await Vacina.findByIdAndUpdate(vacinaId, { status: 'Aplicada' });

        return res.json(aplicacao);

    } catch (error) {
        console.error('Erro na aplicação:', error);
        return res.status(500).json({ message: 'Erro ao registrar aplicação' });
    }
}; 

exports.listarTodas = async (req, res) => {
    try {
        const vacinas = await Vacina.find();
        console.log(`Enviando ${vacinas.length} vacinas para o App.`);
        return res.json(vacinas);
    } catch (error) {
        console.error('Erro ao buscar vacinas:', error);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
};