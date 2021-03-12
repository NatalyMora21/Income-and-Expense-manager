const express = require("express");
const app = express();
app.use(express.json())
//Import Routes
app.use(express.json());
//Indicar que todas las rutas 
app.use('/',require('./e_routes/userrouter'));

module.exports = app;




