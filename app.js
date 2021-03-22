const express = require("express");
const cors= require("cors");
const app = express();

//Import Routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//Indicar que todas las rutas 
app.use('/',require('./e_routes/userrouter'));
app.use('/transactions',require('./e_routes/transactionsroute'));
module.exports = app;




