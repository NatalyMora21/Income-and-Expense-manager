const bcrypt= require('bcrypt');


const encryptPassword= async(password)=>{
    //Veces que se ejuecuta el algoritmo
    const salt= await bcrypt.genSalt(10)
    //crear la contraseña cifrada
    return await bcrypt.hash(password,salt);
}

const ComparePassword= async(password,receivedPassword)=>{
    return await bcrypt.compare(password,receivedPassword);
   
}

module.exports = {encryptPassword, ComparePassword};
