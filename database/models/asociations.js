//One to many
//User has many transactions

const User= require('./user');
const Transaction= require('./transactions');
User.hasMany(Transaction, {as:trnsacciones,foreignKey:"user"});

//User Id to the table transactions
Transaction.belongTo(User)


