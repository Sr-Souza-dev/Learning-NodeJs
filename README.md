# Introdução
Este curso trata a criação de uma api utilizando o node juntamento com o SGBD MariaDB

## Ferramentas utilizadas para facilitar
Dentro do arquivo package.json é possível criar "atalhos" para utilizar no momento de execução, alguns ja pré-definidos e outros que podem ser chamados via npm, abaixo temos o codigo utilizado:

</br>
 "scripts": {
    "start": "nodemon --inspect app.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "criar-banco": "yarn sequelize db:create",
    "criar-migration": "yarn sequelize migration:create --name=criar-tabela-xyz",
    "executar-migration": "yarn sequelize db:migrate",
    "desfazer-migration": "yarn sequelize db:migrate:undo"
  },
</br>

Veja abaixo alguns atalhos(comandos) e suas implicações
1. start                -> para debugar e dar reload a qualquer alteração no codigo em tempo real
2. criar-banco          -> cria o banco de dados via yarn e sequelize
3. criar-migration      -> migration funciona como o git, salva alterações estruturais feitas no sgbd, este comando cria um migration de nome "criar-tabela-xyz" que será executado após o comando abaixo ser executado
4. executar-migration   -> faz alguma modificação no banco de dados
5. desfazer-migration   -> desfaz a ultima migration executada

## Passos de conexão
### Configurando o Banco 
1. Instalar as dependências do (mariadb, sequelize, sequelize-cli, yarn)
2. Criar as constantes no arquivo .env
3. Criar config de sequelize no diretorio config, criando um arquivo database.
4. Criar arquivo .sequelizerc na raiz do projeto

# Comandos de terminal 
1. npm i "packageName"  -> instala um pacote/dependência no projeto
2. npm.start            -> inicializa a api (executa na porta definida)

# Pacotes Instalados
Para instalar pacotes no projeto node pode-se utilizar o 'npm i ...' que vai baixar o pacote e criar uma pasta de dependências no projeto. </br>
Os pacotes utilizados para o desenvolvimento deste curso são:

1. express          <npm i express>         -> para trabalhar com requisições http
2. dotenv           <npm i dotenv>          -> para trabalhar com variaveis de ambiente
3. cors             <npm i cors>            -> para trabalhar com um tipo de requisição
4. nodemon          <npm i nodemon>         -> Faz um relload do servidor após cada alteração
5. mysql2           <npm i mysql2>          -> SGBD do sistema desenvolvido (Utilizado para o maria db)
6. sequelize        <npm i sequelize>       -> Ele possui um mecanismo de migração muito poderoso que pode transformar um esquema existente de banco de dados em uma nova versão e também fornece mecanismos de sincronização de banco de dados que podem criar estrutura de banco de dados especificando a estrutura do modelo
6. sequelize-cli    <npm i sequelize-cli>   -> Ferramentas para facilitar as operações no SGBD
7. yarn             <npm i yarn>            -> Gerenciador de pacotes de trás algumas facilidades para trabalhar com o sequelize
8. md5              <npm i md5>             -> Criptografa de forma irreversível 


# Arquivos/Pastas nunca utilizados antes por mim

## Arquivos
1. <.env> É um arquivo de configuração (nele são adicionadas variaveis de ambiente que podem ser acessadas de qualquer lugar do projeto)

## Pastas
1. Controllers      -> Armazena arquivos que receberão todas as requisições (ele simplesmente recebe, não precisa resolver)



