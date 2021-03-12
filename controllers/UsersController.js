const User = require("../database/models/User");

const createUser = async(req, res) => {
    const {name,email,password, roles}= req.body;

    const user= await User.create({
        name,
        email,
        password
    });

  res.send(user);

};

const users=async (req, res)=>{
    const users=await User.findAll();
    res.send({users});
}

module.exports = {createUser,users};
