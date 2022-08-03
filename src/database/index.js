const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Perfil = require('../models/perfil');
const Users = require('../models/users');

const connection = new Sequelize(dbConfig);

const models = [Perfil, Users]
models.map(model => model.init(connection))

module.exports = connection;
