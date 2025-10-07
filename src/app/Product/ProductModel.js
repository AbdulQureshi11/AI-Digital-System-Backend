const productModel = (sequelize, DataTypes) => {
    return sequelize.define("Product", {
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
        dis: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        detail: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bullets: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        whyChoose: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        buttonText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};

export default productModel;
