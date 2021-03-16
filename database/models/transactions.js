  
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Operations extends Model {}
Operations.init({
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    amount:DataTypes.DECIMAL,
}, {
    sequelize,
    modelName: "operations"
});

module.exports = Operations;