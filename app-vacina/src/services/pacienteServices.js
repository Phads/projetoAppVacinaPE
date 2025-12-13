import api from './api';

// Função para salvar/atualizar o paciente vindo do QR Code
export const salvarPacienteQrCode = async (dadosPaciente) => {
    try {

        console.log("Tentando conectar em: /api/pacientes/qrcode");
        
        // Imprime a URL base para sabermos o IP
        console.log("Base URL do axios:", api.defaults.baseURL);

        const response = await api.post('/api/pacientes/qrcode', dadosPaciente);
        return response.data;
    } catch (error) {
        console.error("Erro ao salvar paciente via QR Code:", error);
        throw error;
    }
};

// Função para buscar dados completos pelo CNS (usada na tela de detalhes)
export const buscarPacientePorCns = async (cns) => {
    try {
        const response = await api.get(`/api/pacientes/${cns}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar paciente:", error);
        throw error;
    }
};