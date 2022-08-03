require('dotenv').config()              // Importando o arquivo .env para ser utilizado neste arquivo
require('../database/index')            // Iniciando os modelos do SGBD

const express = require('express');
const cors = require('cors');
const routes = require("../../routes");

const app = express();

app.use(cors());                            // Para que a requisição não seja bloqueada pela api (qualquer um pode fazer requisição para esta api)
app.use(express.json({limit: '50mb'}));     // Toda requisição será convertida para json com limite maximo de tamanho em 50Mb
app.use(routes)

module.exports = app;


