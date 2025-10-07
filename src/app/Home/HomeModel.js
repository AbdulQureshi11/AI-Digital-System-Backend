// homeModel.js
const homeModel = (sequelize, DataTypes) => {
    return sequelize.define("Home", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        heading: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        buttonText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};

export default homeModel;
