// src/app/Aboutus/AboutusModel.js
const aboutModel = (sequelize, DataTypes) => {
    return sequelize.define("About", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        topImage1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        topImage2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        movingImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        bottomImage1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bottomText1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bottomImage2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bottomText2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        buttonText: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
};

export default aboutModel;
