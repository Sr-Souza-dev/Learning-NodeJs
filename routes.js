const express = require('express');             // Importando o express para utilizar algum de seus modulos
const routes = express.Router();                // Utilizando o modulo de rotas do express e transformando este arquivo em um arquivo de rotas
const usuarioService = require('./src/services/usuarioService')

// Definindo uma instancia do controller para comunicação via api
const UsuarioController = require("./src/controllers/UsuarioController");
const usuarioController = new UsuarioController();

// Toda rota antes de ser acionada executará essa função
routes.use(async (req, res, next) => {
    let{authorization} = req.headers;
    let autenticado = await usuarioService.validarAutenticacao(authorization)

    if(!autenticado && req.originalUrl != '/login'){
        return res.status(401).json({'status':401, 'message': "Usuário não autenticado", 'name': 'Não Autenticado'})
    }
    next();
})

// Rotas do usuario
routes.post("/login", usuarioController.login)
routes.delete("/logout", usuarioController.logout)
routes.get("/usuarios/:id", usuarioController.obterPorId)
routes.post("/usuarios/cadastro", usuarioController.cadastrar)
routes.put("/usuarios/atualiza/:id", usuarioController.atualizar)

// Exportando o modulo para que ele possa ser utilizado pelo server.js e consequentemento pelo app.js
module.exports = routes