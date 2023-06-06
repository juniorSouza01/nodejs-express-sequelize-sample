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
    models.Artista.belongsToMany(Instrumento, { through: "ArtistaInstrumento", foreignKey: "artistaId" });
  };
  return Instrumento;
};

/*

const storage = db.Storage.create({
  // preenche as colunas aqui
})
const product = db.Product.create({
  // ...
})

storage.addProduct(product)

*/