module.exports = (sequelize, DataTypes) => {

  const Instrumento = sequelize.define("Instrumento", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Instrumento.associate = function (models) {
    Instrumento.belongsToMany(models.Artista, { through: "ArtistaInstrumento", foreignKey: "instrumentoId" });
  };
  return Instrumento;
};