const express = require('express');
const cors = require('cors');
require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/pacientes', require('./routes/paciente.routes'));
app.use('/api/vacinas', require('./routes/vacina.routes'));

module.exports = app;
