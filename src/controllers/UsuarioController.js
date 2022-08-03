const usuarioService = require('../services/usuarioService');
const {NaoAutorizadoErro, ModeloInvalidoErro} = require('../errors/type-error');
const UsuarioDTO = require('../dtos/usuarioDTO');

class UsuarioController{
    async login(req, res){
        console.log(req.body)
        const {email,senha} = req.body;

        try{
            if(!email || !senha){
                throw new NaoAutorizadoErro(401, "Não é permitido valores nulos");
            }
            let credencial = await usuarioService.autenticacao(email,senha);

            return res.json(credencial);

        }catch(error){
            console.log("Erro no login" + error);
        }
    }

    async logout(req, res){
        try{
            await usuarioService.logout(req.headers.authorization);
            console.log("Usuario deslogado");
        }catch(error){
            console.log("Erro no logout" + error);
            return res.status(error.status).json(error);
        }
    }

    async obterPorId(req, res){
        const {id} = req.params; 
        try{
            if(!id){
                throw new ModeloInvalidoErro(400, "O id é obrigatório para obter o usuario");
            }

            let usuario = await usuarioService.obterPorId(id);

            return res.json(usuario);

        }catch(error){
            console.log("Erro na busca por id" + error);
            return res.status(error.status).json(error);
        }
    }

    async cadastrar(req, res){
        try{
            let usuarioDTO = new UsuarioDTO(req.body);
            usuarioDTO.modeloValidoCadastro();
            
            let usuarioCadastrado = await usuarioService.cadastrar(usuarioDTO);
            return res.json(usuarioCadastrado);
        }catch(error){
            console.log("Erro no Cadastro" + error);
            return res.status(error.status).json(error);
        }
    }

    async atualizar(req, res){
        const {id}  = req.params;
        try{

            if(!id){
                throw new ModeloInvalidoErro(400, "O id é obrigatório na requisição para atualizar o usuário")
            } 

            let usuarioDTO = new UsuarioDTO(req.body);
            usuarioDTO.id = id;
            usuarioDTO.modeloValidoAtualizacao();
            
            let usuarioAtualizado = await usuarioService.atualizar(usuarioDTO);
            return res.json(usuarioAtualizado);
             
        }catch(error){
            console.log("Erro ao atualizar usuario" + error);
            return res.status(error.status).json(error);
        }
    }
}

// Exporta a class para que ela possa ser utilizada em outros arquivos
module.exports = UsuarioController