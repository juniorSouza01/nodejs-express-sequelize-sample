module.exports = (sequelize, DataTypes) => {
    const Musica = sequelize.define("Musica", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quality: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    Musica.associate = function (models) {
      Musica.belongsTo(models.Artista, { foreignKey: 'artistaId' });
    };
  
    return Musica;
  };