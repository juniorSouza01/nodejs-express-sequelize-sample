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
    },{
        associate:function (models){
             Musica.belongsTo(models.Artista);
        }
    });
    return Musica;
  };