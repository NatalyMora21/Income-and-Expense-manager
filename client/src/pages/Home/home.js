import React, {useState} from 'react';
import {Table,Button, Container, Modal, ModalBody, ModalHeader, form} from 'reactstrap'
import Axios from "axios";

const Home= ()=>{

    const [transactions, setTransactions]= useState('');

    const cerarrSesion=()=>{
        localStorage.removeItem('token')
        window.location.href="./"        
    }

    const operationUsers = () => {
        Axios.get("http://localhost:4001/transactions/",{
            headers:{
              "x-access-token": localStorage.getItem("token"),
            }
          })
          .then((result) => {
              setTransactions('hi')
              console.log('result',result);
          })
          .catch((err) => {
            alert("error");
          });
      }

     
    console.log(transactions);
    
    return (
        <div>
            <button color="primary">New operation</button>
            <button onClick={cerarrSesion}>Cerrar sesión</button>
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
                    <tbody>
                    </tbody>
                </Table>

            </Container>
        </div> 
    )
}
export default Home