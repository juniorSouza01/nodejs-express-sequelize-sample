'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
//const artista = require('./artista');
//const musica = require('./musica');
const sequelize = new Sequelize(config.database, config.username, config.password, config);

//db.Artista = artista(sequelize, Sequelize.DataTypes);
sequelize.import('./artista');
sequelize.import('./musica');
//db.Musica = musica(sequelize, Sequelize.DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
