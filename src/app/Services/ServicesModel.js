// src/app/Services/ServiceModel.js
const serviceModel = (sequelize, DataTypes) => {
    return sequelize.define("Service", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        detail: {
            type: DataTypes.TEXT("long"),
            allowNull: true,
        },
        head: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        whyChoose: {
            type: DataTypes.TEXT("long"),
            allowNull: true,
        },
    });
};

export default serviceModel;
