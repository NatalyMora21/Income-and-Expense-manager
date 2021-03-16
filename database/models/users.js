const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        //only letters are allowed
        notNull:{
          msg:"The name cannot be null"
        },
        isAlpha: {
          args: true,
          msg: "The name can only have letters",
        },
        len:{
          args: [2,100],
          msg: "The name must be between 2 and 100"
        }
      },
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isEmail:{
          args:true,
          msg:"The field must be a valid email",
        }
      },
      unique:{
        args:true,
        msg:"The email is already registered in the database",
      },
    } ,
    password:{ 
      allowNull:false,
      type:DataTypes.STRING},
  },
  {
    sequelize,
    modelName: "user",
  }
);

module.exports = User;
