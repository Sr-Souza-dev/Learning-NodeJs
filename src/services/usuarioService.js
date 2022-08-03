const Usuario = require('../models/users'); 
const Perfil = require('../models/perfil'); 
const {NaoAutorizadoErro, NaoEncontradoErro, AplicacaoErro} = require('../errors/type-error')

const geradorToken = require('../utils/geradorToken');
const usuarioCache = require('../cache/usuarioCache');
const UsuarioDTO = require('../dtos/usuarioDTO');
const PerfilDTO = require('../dtos/perfilDTO');

function _criarCredencial(usuario){
    let dataExpiracao = geradorToken.gerarDataExpiracao();

    let credencial = usuarioCache.obterCredencial(usuario);
    if(credencial){
        if(credencial.dataExpiracao < new Date()){
            usuarioCache.removerNoCache(credencial.token);
        } else{
            usuarioCache.atualizarDataExpiracao(credencial.token, dataExpiracao);
            return credencial;
        }
    }

    let token = geradorToken.criarToken(usuario);
    console.log(token)
    usuario.senha = undefined;

    credencial = {token, usuario, dataExpiracao}
    usuarioCache.adicionarNoCache(credencial);
    return credencial;
}

async function autenticacao(email,senha){
    email = email.toString().toLowerCase();

    // Buscando o usuario no banco de dados
    const usuario = await Usuario.findOne({where:{email}});
    
    // Gerando um hash da senha
    senha = geradorToken.gerarHashSenha(senha.toString());

    // Verificando se o usuario é valido e se sua senha está correta
    if(!usuario || (usuario.senha != senha)){
        throw new NaoAutorizadoErro(401, "Usuario ou senha inválidos");
    }

    // Gerando uma credencial de acesso
    let credencial = _criarCredencial(usuario);

    return credencial;
}

async function logout(token){
    await usuarioCache.removerNoCache(token);
}

async function obterPorId(id){
    let usuario = await Usuario.findByPk(id);
    if(!usuario){
        throw new NaoEncontradoErro(404, "Não foi possivel encontar o usuario pelo id: " + id);
    }

    usuario.senha = undefined;
    let usuarioDTO = new UsuarioDTO(usuario);

    let perfil = await Perfil.findByPk(usuario.idPerfil);
    usuarioDTO.perfil = new PerfilDTO(perfil);


    return usuarioDTO;
}

async function validarAutenticacao(token){
    let credencial = usuarioCache.obterCredencialToken(token);

    if(!credencial || credencial.dataExpiracao < new Date()){
        if(credencial){
            usuarioCache.removerNoCache(credencial.token);
        }
        return false;
    }
    return true;
}

async function cadastrar(usuarioDTO){
    usuarioDTO.senha = geradorToken.gerarHashSenha(usuarioDTO.senha);
    let usuario = await Usuario.create(usuarioDTO)

    if(!usuario){
        throw new AplicacaoErro(500, "Falha ao cadastrar usuário")
    }

    let usuariorDTO = new UsuarioDTO(usuario);
    usuariorDTO.senha = undefined;
    return usuariorDTO;
}

async function atualizar(usuarioDTO){
    let usuario = await Usuario.findByPk(usuarioDTO.id);
    if(!usuario){
        throw new NaoEncontradoErro(404, "Não foi possivel encontar o usuario pelo id: " + id);
    }

    usuarioDTO.senha = usuario.senha;
    
    usuario = await Usuario.update(usuarioDTO, {where: {id: usuarioDTO.id}})
    if(!usuario || !usuario[0]){
        throw new AplicacaoErro(500, "Falha ao atualizar usuario com id "+usuario.id)
    }

    usuarioDTO.senha = undefined;

    return usuarioDTO;
}

 module.exports = {autenticacao, logout, obterPorId, validarAutenticacao, cadastrar, atualizar};