module.exports = (sequelize, DataTypes) => {
  const Artista = sequelize.define("Artista", {
    artista: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Artista.associate = function (models) {
    Artista.hasMany(models.Musica, { foreignKey: 'artistaId' });
  };
  return Artista;
};