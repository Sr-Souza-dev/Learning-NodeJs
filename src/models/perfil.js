const {Model, DataTypes} = require('sequelize');

class Perfil extends Model{
    static init(connection){
        super.init({
            description: DataTypes.STRING
        },{
            sequelize: connection,
            tableName: "perfis",
            timestamps: true,
            underscored: false
        })
    }
}

module.exports = Perfil;