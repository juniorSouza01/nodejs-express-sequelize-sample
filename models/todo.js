module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define("Item", {
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
    return Item;
};