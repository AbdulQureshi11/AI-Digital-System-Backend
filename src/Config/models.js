import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./config.js";

import homeModel from "../app/Home/HomeModel.js";
import aboutModel from "../app/Aboutus/AboutusModel.js";
import serviceModel from "../app/Services/ServicesModel.js";
import productModel from "../app/Product/ProductModel.js";
import authModel from "../app/Auth/AuthModel.js";

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.Home = homeModel(sequelize, DataTypes);
db.About = aboutModel(sequelize, DataTypes);
db.Service = serviceModel(sequelize, DataTypes);
db.Product = productModel(sequelize, DataTypes);
db.Auth = authModel;

export default db;
