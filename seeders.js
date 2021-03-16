const sequelize = require("./database/db");
const User = require("./database/models/users");
const Operations = require("./database/models/transactions");
require("./database/asociations");

// Users
const users = [
  { name: "Anton", email: "nat@gmail.com", password: "vsdfsgfsdf" },
  { name: "Pepe", email: "pepe@gmail.com", password: "vsdfsgfsdf" },
  { name: "Lucia", email: "lucia@hotmail.com", password: "vsdfsgfsdf" },
];

// Operations
const operations = [
  { title: "Comida", type: "E",amount: 200, userId: 1 },
  { title: "Viaje", type: "E",amount: 700, userId: 1 },
  { title: "Universidad", type: "E",amount: 500, userId: 1 },
  { title: "servicios", type: "E",amount: 800, userId: 1 },
  { title: "Transporte", type: "E",amount: 300, userId: 2 },
  { title: "Venta sitioweb", type: "I",amount: 100, userId: 2 },
  { title: "Nómina", type: "I", amount: 200, userId: 3 },
];


  
    // Rellenar usuarios

/*(async () => {
      let newusers = await users.forEach((user) => User.create(user));
      let newoperations = await operations.forEach((operation) => Operations.create(operation));
    })();*/

    sequelize.sync({ force: false }).then(() => {
      // Conexión establecida
      console.log("Conexión establecida...");
  }).then(() => {
      // Rellenar usuarios
      //users.forEach(user => User.create(user));
      operations.forEach(operation => Operations.create(operation));

      console.log('Users')
  })
  
  /*.then(() => {
      // Rellenar direcciones
      operations.forEach(operation => Operations.create(operations));
      console.log('transacciones')
  })*/