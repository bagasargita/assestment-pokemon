import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Product = db.define(
  "products",
  {
    name: {
      type: DataTypes.STRING,
    },
    hp: {
      type: DataTypes.STRING,
    },
    attack: {
      type: DataTypes.STRING,
    },
    defense: {
      type: DataTypes.STRING,
    },
    special_attack: {
      type: DataTypes.STRING,
    },
    special_defense: {
      type: DataTypes.STRING,
    },
    speed: {
      type: DataTypes.STRING,
    },
    picture: DataTypes.JSON,
  },
  {
    freezeTableName: true,
  }
);

export default Product;
