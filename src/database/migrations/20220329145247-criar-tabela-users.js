'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      return queryInterface.createTable('users',{
        id:{
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true
        },
        nome:{
          type: Sequelize.STRING,
          allowNUll: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNUll: false,
          unique: true
        },
        senha:{
          type: Sequelize.TEXT,
          allowNUll: false,
        },
        idPerfil:{
          type: Sequelize.BIGINT,
          allowNUll: false,
        },
        inativationDate:{
          type: Sequelize.DATE,
          allowNUll: true,
          defaultValue: null
        },
        createdAt:{
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        },
        updatedAt:{
          type: Sequelize.DATE,
          defaultValue: null,
          allowNUll: true
        }
      }) 
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('users')
  }
};
