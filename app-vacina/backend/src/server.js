const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = require('./app');

const pacienteRoutes = require('../src/routes/paciente.routes');
const vacinaRoutes = require('../src/routes/vacina.routes');

app.use('/api/pacientes', pacienteRoutes);
app.use('/api/vacinas', vacinaRoutes);

app.listen(process.env.PORT, () => {
  console.log(` Servidor rodando na porta ${process.env.PORT}`);
});
