'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('perfis',{
      id:{
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },

      description:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      createdAt:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },

      updatedAt:{
        type: Sequelize.DATE,
        defaultValue: null,
        allowNull: true
      },
    })
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('perfis');
  }
};
