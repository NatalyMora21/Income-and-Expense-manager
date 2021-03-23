const { transaction } = require("../database/db");
const Transactions = require("../database/models/transactions");

//Function ALL user transactions
const alltransactions = async (req, res) => {
  console.log('Ingreso')
  const transactions = await Transactions.findAll({
    attributes: ["title", "type", "amount", "id"],
    where: {
      userId: req.userid,
    },
  });
  console.log(transactions);
  res.json(transactions);
};

//Function CREATE transaction made by user
const createtransaction = async (req, res) => {
  //Files: id user,typeoperations and amount
  console.log("createtransaction");
  const { title, amount, type } = req.body;
  const userId = req.userid;
  console.log(userId);
  try {
    let transaction = await Transactions.create({
      title,
      type:"I",
      amount,
      userId,
    });
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Function MODIFY transaction
const modifytransaction = async (req, res) => {
  const { idtransaction, amount } = req.body;

  console.log('idddd',idtransaction);

  const updatetransaction = await Transactions.update(
    {
      amount: amount,
    },
    {
      where: {
        id: idtransaction,
        userId: req.userid,
      },
    }
  );
  res.json(updatetransaction);
};

//Function DELETE transaction
const deletetransaction = async (req, res) => {
  const idtransaction = req.params.id;
  console.log('idtransaction',req.userid);
  let deletetransactons = await Transactions.destroy({
    where: {
      id: idtransaction,
      //userId: req.userid,
    },
  });
  res.json(deletetransactons);
};

module.exports = {
  alltransactions,
  createtransaction,
  modifytransaction,
  deletetransaction,
};
