'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const ArtistaModel = require('./artista');
const MusicaModel = require('./musica');
const InstrumentoModel = require('./instrumento');
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Artista = ArtistaModel(sequelize, Sequelize.DataTypes);
const Musica = MusicaModel(sequelize, Sequelize.DataTypes);
const Instrumento = InstrumentoModel(sequelize, Sequelize.DataTypes);

db.Artista = Artista;
db.Musica = Musica;
db.Instrumento = Instrumento;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

Artista.associate(db);
Musica.associate(db);
Instrumento.associate(db);

module.exports = db;