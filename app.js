// Este arquivo fica responsavel por levantar o servidor/api

const app   = require('./src/config/server');
const porta = process.env.PORTA;                            // Acessando a variavel PORTA que foi declarada no arquivo .env

app.listen(porta, () => console.log("Api rodando na porta: " + porta));