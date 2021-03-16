const express = require("express");
const app = express();
app.use(express.json())
//Import Routes
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//Indicar que todas las rutas 
app.use('/',require('./e_routes/userrouter'));
app.use('/transactions',require('./e_routes/transactionsroute'));
module.exports = app;




