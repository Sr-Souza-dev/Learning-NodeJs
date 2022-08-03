// Definindo o ambiente do banco de dados
let ambiente = undefined;

switch(process.env.PUBLICAR){
    case "HML":
        ambiente = configurarHML();
        break;
    case "PROD":
        ambiente = configurarPROD();
        break;
    case "LOCAL":
        ambiente = configurarLOCAL();
        break;
}

// DEFININDO COMO E EM QUAL AMBIENTE O DATABASE SERÁ LEVANTADO 
// Define ambiente de homologação (publicação)
function configurarHML(){
    return{
        dialect: process.env.HML_DIALECT,
        host: process.env.HML_HOST,
        port: process.env.HML_PORT,
        username: process.env.HML_USER_NAME,
        password: process.env.HML_PASSWORD,
        database: process.env.HML_DATABASE,
        define: {
            timestamps: true,                   // O sequelize começará a trabalhar sempre considerando data e hora
            underscored: true,
        }
    }
}
// Define ambiente de produção
function configurarPROD(){
    return{
        host: process.env.PROD_HOST,
        port: process.env.PROD_PORT,
        dialect: process.env.PROD_DIALECT,
        username: process.env.PROD_USER_NAME,
        password: process.env.PROD_PASSWORD,
        database: process.env.PROD_DATABASE,
        define: {
            timestamps: true,                   // O sequelize começará a trabalhar sempre considerando data e hora
            underscored: true
        }
    }
}
// Define ambiente local
function configurarLOCAL(){
    return{
        host: process.env.LOCAL_HOST,
        port: process.env.LOCAL_PORT,
        dialect: process.env.LOCAL_DIALECT,
        username: process.env.LOCAL_USER_NAME,
        password: process.env.LOCAL_PASSWORD,
        database: process.env.LOCAL_DATABASE,
        define: {
            timestamps: true,                   // O sequelize começará a trabalhar sempre considerando data e hora
            underscored: true
        }
    }
}

module.exports = ambiente;
