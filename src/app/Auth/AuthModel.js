// src/app/Auth/AuthModel.js
import { DataTypes } from "sequelize";
import sequelize from "../../Config/config.js";

const authModel = sequelize.define("auth", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default authModel;
