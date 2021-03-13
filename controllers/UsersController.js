const User = require("../database/models/user");

const createUser = async (req, res) => {
  const { name, email, password, roles } = req.body;

  try {
    let user = await User.create({
      name,
      email,
      password,
    });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const users = async (req, res) => {
  const users = await User.findAll();
  res.send({ users });
};

module.exports = { createUser, users };
