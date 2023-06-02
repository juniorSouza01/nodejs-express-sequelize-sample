'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const ArtistaModel = require('./artista');
const MusicaModel = require('./musica');
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Artista = ArtistaModel(sequelize, Sequelize.DataTypes);
const Musica = MusicaModel(sequelize, Sequelize.DataTypes);

db.Artista = Artista;
db.Musica = Musica;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

Artista.associate(db);
Musica.associate(db);

module.exports = db;