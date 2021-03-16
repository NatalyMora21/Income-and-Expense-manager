const User = require("../database/models/users");
const { encryptPassword, ComparePassword } = require("./encryptpassword");
const jwt = require( 'jsonwebtoken');
const config = require('../middlware/config') ;



//Function CREATE USER
const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let passwordnew = await encryptPassword(password);
    console, console.log(passwordnew);
    let user = await User.create({
      name,
      email,
      password: passwordnew,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const signIn = async (req, res) => {
  //Valida si hay usaurio registrado con ese correo

  const userfound = await User.findAll({
    attributes: ['password','id'],
    where: {
      email: req.body.email
    }
  });

  

  console.log(userfound[0].dataValues.password);
  if (userfound.length==0) return res.status(400).json({ message: "User not found" });

  const matchpassword = await ComparePassword(
    req.body.password,
    userfound[0].dataValues.password
  );

  if (!matchpassword) {
    return res.status(401).json({ token: null, message: "Invalid Password" });
  }

  console.log(userfound[0].dataValues.id);

  const token = jwt.sign({ id: userfound[0].dataValues.id}, config.SECRET, {
    expiresIn: 86400,
  });
  res.json({ token });
};

//Function User validate authentication
//Traer todas las transacciones relacionadas al usuario
const Usertransactions = (req, re) => {};

module.exports = { signUp, signIn };
