const { ModeloInvalidoErro } = require("../errors/type-error");
const PerfilDTO = require("./perfilDTO");

module.exports = class UsuarioDTO{
    constructor(obj){
        obj = obj || {};
        this.id = obj.id;
        this.nome = obj.nome;
        this.email = obj.email;
        this.senha = obj.senha;
        this.perfil = obj.perfil && new PerfilDTO(obj.perfil);
        this.idPerfil = obj.idPerfil;
        this.inativationDate = obj.inativationDate;
        this.createdAt = obj.createdAt;
        this.updatedAt = obj.updatedAt;
    }

    modeloValidoCadastro(){
        let validacao = !!(this.email && this.senha && this.nome && this.idPerfil);

        if(!validacao){
            throw new ModeloInvalidoErro(400,"Os campos nome, email, senha, idperfil - são obrigatórios")
        }
    }

    modeloValidoAtualizacao(){
        let validacao = !!(this.id && this.email && this.nome && this.idPerfil);

        if(!validacao){
            throw new ModeloInvalidoErro(400,"Os campos nome, email, senha, idperfil - são obrigatórios")
        }
    }
}