const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Transactions extends Model {}

Transactions.init(
  {
    user: DataTypes.STRING,
    monto: DataTypes.NUMBER,
  },
  {
    sequelize,
    modelName: "transactions",
  }
); 

module.exports = Transactions;