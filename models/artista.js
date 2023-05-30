module.exports = (sequelize, DataTypes) => {
    const Artista = sequelize.define("Artista", {
      artista: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },{
      associate:function (models){
        Artista.hasMany(models.Musica);
      }
  });
    return Artista;
  };