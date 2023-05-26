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

    const Category = sequelize.define("Category", {
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    
    return {
        Item,
        Category
    };
};