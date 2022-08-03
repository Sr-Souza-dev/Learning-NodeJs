const {Model, DataTypes} = require('sequelize')

class Users extends Model{

    static init(connection){
        super.init({
             nome: DataTypes.STRING,
             senha: DataTypes.TEXT,
             email: DataTypes.STRING,
             idPerfil: DataTypes.BIGINT,
             inativationDate: DataTypes.DATE
        },{
            sequelize: connection,
            tableName: "users",
            timestamps: true,
            underscored: false
        })
    }
}

module.exports = Users;