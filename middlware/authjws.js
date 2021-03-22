//Validar el token que estoy enviando

const jwt = require('jsonwebtoken') ;
const config= require('./config') ;
const User = require('../database/models/users')


const verifyToken= async(req, res, next)=>{

  console.log(req.headers["x-access-token"])

    try {
        const token= req.headers["x-access-token"]; 
        console.log(token)
        //Si no se está enviando ningún toke
        if(!token) return res.json({message: 'No token provided'});
        //Validar si el token es válido, con el id puedo validar que usuario está logueado
        const decoded= await jwt.verify(token,config.SECRET);
        req.userid= decoded.id;       
        //Cuando me devuelve el objeto no necesito la contraseña, por eso
        const user = await User.findAll({
            attributes: ['email','name'],
            where: {
              id: req.userid
            }
          });

        if(user.length==0) return res.json({message: 'User not found'});
        next();
    } catch (error) {
      return res.status(500).json({auth:false,message:"U failed to authenticate"});
    }
}

module.exports = verifyToken;