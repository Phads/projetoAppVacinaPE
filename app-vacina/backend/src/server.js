require('dotenv').config();
const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log(` Servidor rodando na porta ${process.env.PORT}`);
});
