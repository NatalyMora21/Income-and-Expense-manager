//One to many
//User has many transactions
const User= require('./models/users');
const Operations= require('./models/transactions');
//Se añade una clave user id a la tabla transactions

User.hasMany(Operations);
Operations.belongsTo(User);

//User Id to the table transactions
 


