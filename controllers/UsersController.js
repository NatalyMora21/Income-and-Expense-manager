const User = require("../database/models/users");
const { encryptPassword, ComparePassword } = require("./encryptpassword");
const jwt = require("jsonwebtoken");
const config = require("../middlware/config");

//Function CREATE USER
const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let passwordnew = await encryptPassword(password);
    console.log("pass", passwordnew);
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
  try {
    const userfound = await User.findAll({
      attributes: ["password", "id", "name","email"],
      where: {
        email: req.body.email,
      },
    });

    if (userfound.length == 0) {
      return res.json({auth:false, message: "User not found" });
    }
    else{
      //validate password
      console.log(req.body.password);
      const matchpassword = await ComparePassword(
        req.body.password,
        userfound[0].dataValues.password
      );
      //Invalid Password
      if (!matchpassword) {
        return res.json({auth:false, message: "Invalid Password" });
      }
      else{
        //Create token
        const token = jwt.sign({ id: userfound[0].dataValues.id}, config.SECRET, {
          expiresIn: 300,
        });
        const name= userfound[0].dataValues.name;
        const email= userfound[0].dataValues.email;

        return res.json({auth:true ,token: token, message: "Password and user ok",info:[{name,email}]});
      }
    }

  } catch (err) {
    res.status(500).json(err);
  }
};
/*
const signIn = async (req, res) => {
  //Valida si hay usaurio registrado con ese correo

  console.log(req.body.email);
  const userfound = await User.findAll({
    attributes: ['password','id', 'name'],
    where: {
      email: req.body.email
    }
  });

  console.log('user',userfound)
  if (userfound.length==0) return res.status(201).json({ message: "User not found" });
  console.log(userfound[0].dataValues.password);

  const matchpassword = await ComparePassword(
    req.body.password,
    userfound[0].dataValues.password
  );

  if (!matchpassword) {
    return res.status(201).json({ token: null, message: "Invalid Password" });
  }

  console.log(userfound[0].dataValues.id);

  const token = jwt.sign({ id: userfound[0].dataValues.id}, config.SECRET, {
    expiresIn: 300,
  });

  res.json({auth:true, token: token, result:userfound})
  res.json(userfound);
};*/

//Function User validate authentication
//Traer todas las transacciones relacionadas al usuario

const isUserAuth = (req, res) => {
  return res.send('You are authenticated');

};

module.exports = { signUp, signIn, isUserAuth};
