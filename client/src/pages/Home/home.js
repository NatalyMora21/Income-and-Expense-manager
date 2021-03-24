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

import icondelete from '../../assets/images/trash-alt-solid.svg';


//import { faHome } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import '../style.css'

const Home = () => {
  const [transactions, setTransactions] = useState("");

  //transaction form fields
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [listoperation, setlistoperation] = useState([]);
  const [newamount, setNewamount] = useState(0);
  const [ingresos, setIngresos] = useState(0);
  const [egresos, setEgresos] = useState(0);
  const [total, setTotal] = useState(false);



  const [showtable, setshowTable] = useState(true);

  function handleChange(name, value) {
    if (name == "title") {
      setTitle(value);
    } else {
      setAmount(value);
    }
  }

  const balance= (arrayoperations)=>{
    console.log('balance',arrayoperations);
    let ingresosuser=0;
    let egresosuser=0;
    arrayoperations.forEach(function(operation) {
      console.log((operation.amount)) 
      if (operation.type === 'I') {
        ingresosuser+=(parseFloat(operation.amount));
      }
      else{
        egresosuser+=(parseFloat(operation.amount));
      }
    });
    setIngresos(ingresosuser);
    setEgresos(egresosuser);

    console.log('suma',ingresosuser)
    console.log('resta',egresosuser)
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
      type: type
    };

    Axios.post("http://localhost:4001/transactions/create", data, {
      headers: headers,
    })
      .then((result) => {
        setshowTable(true)
        setTotal(true);
        Operationusers();
        console.log(listoperation);
        setlistoperation([...listoperation,
          {title: title,
          amount: amount,
          type:type}
        ]);
        balance([...listoperation,
          {title: title,
          amount: amount,
          type:type}
        ]);

        console.log("result", result);
      })
      .catch((err) => {
        alert("error");
      });
  };


  const handleChangetype= (e)=> {
    setType(e.target.value);
  }



  //All user transactions
  const Operationusers = () => {
    Axios.get("http://localhost:4001/transactions/", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((result) => {

        console.log(result.data.length);

        if(result.data.length==0){
          console.log('hi');
          setshowTable(false)
        }
        else{
          setshowTable(true)
        }
        setTotal(true);
        setlistoperation(result.data)
        balance(result.data);
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
        console.log('update',result.data);
        const listnewu=listoperation.map((val)=>{
          console.log(val.id==id, id);
          return val.id==id? {id:val.id, title:val.title, amount:newamount, type:val.type}: val
        });
        setlistoperation(listnewu);
        balance(listnewu);
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
        const listnew= listoperation.filter((val)=>{
          return val.id !=id
        })
        setlistoperation(listnew)
        balance(listnew);

      })
      .catch((err) => {
        alert("error");
      });
  };

 


  console.log(title + amount);

  return (
    <div className="container">

      <div className="button-closesesion">
        <button onClick={cerarrSesion} type="button" className="btn btn-outline-secondary close-session">Logout</button>
      </div>
      

      <div className="card">
        <div className="card-header">
          New operation
        </div>
        <div className="card-body">

          

            <Label text="Transaction name" />
            <Input attribute={{id: "title",name: "title", type: "text", placeholder: "Enter your Transaction name",}} 
            handleChange={handleChange}
            />
            <Label text="Amount" />
            <Input attribute={{ id: "amount", name: "amount", type: "text", placeholder: "Enter amount",}}
              handleChange={handleChange}
            />

            <Label text="Type" />
            <select value={type} onChange={handleChangetype} className="form-control">
              <option value=""></option>
              <option value="I">Entry</option>
              <option value="E">Discharge</option>
            </select>


            <button onClick={createTransactions} className="button-createoperation">Create Operation</button>

        </div>
      </div>


      <button onClick={Operationusers} className="button-morado"> + Press to consult all operations</button>

      {!showtable && <div className="alert alert-light" role="alert">There are no registered operations!</div>}

      {total &&
            <div className="row results">
            <div className="col-sm-6">
              <h6 className="entry">Entry</h6>
              <p>$ {ingresos}</p>
            </div>
            <div className="col-sm-6">
              <h6 className="discharge">Discharge</h6>
              <p>$ {egresos}</p>
            </div>
          </div>
       } 

      <Container>
        <Table>
          <thead>
  
          </thead>
          <tbody>
          {listoperation.map((val, i)=>{
          return (
            
            <tr>
              <td>{val.title}</td>
              <td>{val.type=='I' ? <p className="entry">Entry +</p>:<p className="discharge">Discharge -</p>}</td>
              <td>{val.amount}</td>
              <td><input type="text" onChange={(e)=>{setNewamount(e.target.value)}} placeholder="new amount" className="form-control"></input>
                <button className="btn btn-outline-primary" onClick={()=>{updateOperations(val.id)}}>Update</button></td>
              <td><button className="but-delete"onClick={()=>{deleteOperations(val.id)}}><img src={icondelete} className="icondelete"/></button></td>
            </tr>
            
          )
      })}


          </tbody>
        </Table>
      </Container>






    </div>
  );
};
export default Home;
