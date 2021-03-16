//Validar el token que estoy enviando

const jwt = require('jsonwebtoken') ;
const config= require('./config') ;
const User = require('../database/models/users')


const verifyToken= async(req, res, next)=>{

    try {
        
        const token= req.headers["x-access-token"]; 
        //Si no se está enviando ningún toke
        if(!token) return res.status(403).json({message: 'No token provided'});
        console.log(config.SECRET);
        //Validar si el token es válido, con el id puedo validar que usuario está logueado
        const decoded= await jwt.verify(token,config.SECRET);

        console.log(decoded);
    
        //IMPORTANTE
        req.userid= decoded.id;
        //Cuando me devuelve el objeto no necesito la contraseña, por eso
        const user = await User.findAll({
            attributes: ['email','name'],
            where: {
              id: req.userid
            }
          });
        console.log(user);
    
        if(user.length==0) return res.status(404).json({message: 'Usuario no encontrado'});
        next();
    } catch (error) {

        return res.status(401).json({message: 'Unauthorized'})
        console.log(error);
    }
}

module.exports = verifyToken;