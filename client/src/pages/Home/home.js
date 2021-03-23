import React, { useState } from "react";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  form,
} from "reactstrap";
import Axios from "axios";
import Title from "../components/Title/title.jsx";
import Label from "../components/Label/label.jsx";
import Input from "../components/Input/input.jsx";

const Home = () => {
  const [transactions, setTransactions] = useState("");

  //transaction form fields
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [listoperation, setlistoperation] = useState([]);
  const [newamount, setNewamount] = useState(0);

  function handleChange(name, value) {
    if (name == "title") {
      setTitle(value);
    } else {
      setAmount(value);
    }
  }
  //Close session
  const cerarrSesion = () => {
    localStorage.removeItem("token");
    window.location.href = "./";
  };
  //Create transactions
  const createTransactions = () => {
    const headers = {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      };
    const data = {
      title: title,
      amount: amount,
    };

    Axios.post("http://localhost:4001/transactions/create", data, {
      headers: headers,
    })
      .then((result) => {
        setlistoperation([...listoperation,
            {title: title,
            amount: amount}
        ])
            console.log("result", result);
      })
      .catch((err) => {
        alert("error");
      });
  };

  //All user transactions
  const Operationusers = () => {
    Axios.get("http://localhost:4001/transactions/", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((result) => {
        setlistoperation(result.data)
        console.log("All operations for user", result.data);
      })
      .catch((err) => {
        alert("error");
      });
  };

  //Modify transactions
  const updateOperations = (id) => {
    
    const headers = {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      };
    Axios.put("http://localhost:4001/transactions/modify",{
        amount: newamount,
        idtransaction:id,
      }, {
        headers: headers,
      })
      .then((result) => {
        console.log('update',result.data)
        setlistoperation(listoperation.map((val)=>{
          console.log(val.id==id, id);
          return val.id==id? {id:val.id, title:val.title, amount:newamount, type:val.type}: val
        }))
      })
      .catch((err) => {
        alert("error");
      });
  };


  //Delete transactions
  const deleteOperations = (id) => {
    Axios.delete(`http://localhost:4001/transactions/delete/${id}`)
      .then((result) => {
        console.log('delete',result.data)
        setlistoperation(listoperation.filter((val)=>{
          return val.id !=id
        }))
      })
      .catch((err) => {
        alert("error");
      });
  };


  console.log(title + amount);

  return (
    <div>
      <Label text="Transaction name" />
      <Input
        attribute={{
          id: "title",
          name: "title",
          type: "text",
          placeholder: "Enter your Transaction name",
        }}
        handleChange={handleChange}
      />
      <Label text="Amount" />
      <Input
        attribute={{
          id: "amount",
          name: "amount",
          type: "text",
          placeholder: "Enter amount",
        }}
        handleChange={handleChange}
      />
      <button onClick={createTransactions}>Create Operation</button>


      <button onClick={cerarrSesion}>Cerrar sesión</button>

      <button onClick={Operationusers}>All operations</button>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody></tbody>
        </Table>
      </Container>


      {listoperation.map((val, i)=>{
          return (
            
            <div>
              <div>
                {val.title}
                {val.amount}
                {val.type}
                --{val.id}---
                <input type="text" onChange={(e)=>{setNewamount(e.target.value)}} placeholder="new amount"></input>
                <button onClick={()=>{updateOperations(val.id)}}>Update</button>
                <button onClick={()=>{deleteOperations(val.id)}}>Delete</button>
              </div>
            </div>
            
          )
      })}



    </div>
  );
};
export default Home;
