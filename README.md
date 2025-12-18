# Projeto aplicativo Vacina+ PE

## Autores e Integrantes
Projeto desenvolvido por:

* **Pedro Alves**
* **Ítalo Tavares**

Sistema mobile para gestão e registro de imunização em unidades de saúde.

## Propósito do Projeto

O **Vacina+PE** foi desenvolvido para modernizar e agilizar o fluxo de atendimento de vacinação no SUS e redes privadas. O aplicativo permite que enfermeiros e técnicos de saúde:

- Identifiquem pacientes rapidamente via número do CNS ou **QR Code**.
- Visualizem o histórico completo de vacinas (Carteira Digital).
- Registrem novas aplicações de doses com validação de fabricante, lote e local de aplicação.
- Gerem comprovantes digitais (PDF) e enviem por e-mail automaticamente.
- Acompanhem o resumo de atendimentos do plantão em tempo real.

O objetivo é eliminar o uso excessivo de papel, reduzir erros de registro e oferecer um histórico digital confiável para o paciente.

## Tecnologias Utilizadas

O projeto foi construído utilizando uma arquitetura moderna baseada em JavaScript/TypeScript.

### Mobile (Frontend)
- **React Native (Expo):** Framework principal.
- **TypeScript:** Para tipagem segura e melhor manutenção.
- **Expo Router:** Navegação entre telas.
- **Axios:** Comunicação com a API.
- **AsyncStorage:** Persistência de dados locais (sessão).
- **Expo Camera / BarcodeScanner:** Leitura de cartão SUS via QR Code.
- **Expo Print & MailComposer:** Geração de PDFs e envio de e-mails.

### Servidor (Backend)
- **Node.js:** Ambiente de execução.
- **Express:** Framework para API Rest.
- **MongoDB & Mongoose:** Banco de dados NoSQL e modelagem de dados.
- **JWT (JSON Web Token):** Autenticação e segurança.

## 🛠️ Funcionalidades Principais

1. **Autenticação Segura:** Login para profissionais de saúde.
2. **Dashboard:** Resumo de atendimentos diários do profissional.
3. **Busca Inteligente:** Localização de pacientes por CNS ou leitura de câmera.
4. **Registro de Doses:** Wizard passo-a-passo para registrar múltiplas vacinas.
5. **Comprovante:** Geração automática de documento oficial em PDF.


---
*Desenvolvido como para nota e avaliação da disciplina: Programação de Dispositivos Móveis-2025.2 do curso de Análise e Desenvolvimento de Sistemas. IFPE Campus Paulista*
