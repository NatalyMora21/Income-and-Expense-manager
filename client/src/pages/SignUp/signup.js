import React, {useState} from 'react';
import Axios from "axios";
//import 'bootstrap/dist/css/bootstrap.min.css'
import Title from '../components/Title/title.jsx'
import Label from '../components/Label/label.jsx'
import Input from '../components/Input/input.jsx'

const SignUp= ()=>{
    const [name, setName]= useState('');
    const [user, setUser]= useState('');
    const [password, setpassword]= useState('');

    function handleChange(value){
            //Varible para almacenar
            setName(value);
            setUser(value);
            setpassword(value);
    }

    const register = () => {
        Axios.post("http://localhost:4001/signup", {
          name: name,
          email: user,
          password: password,
        })
          .then((result) => {
            alert("Successfully registered user");
          })
          .catch((err) => {
            alert("error");
          });
      };

return (
    <div className="login-container">
        <Title text="Bienvenido"/>
        <Label text="Name"/>
        <Input attribute={{id:'name', name: 'name', type:'text', placeholder: 'Enter your name' }}
        handleChange ={handleChange} />
        <Label text="User"/>
        <Input attribute={{id:'user', name: 'user', type:'email', placeholder: 'Enter your username' }}
        handleChange ={handleChange} />
        <Label text="Contraseña"/>
        <Input attribute={{id:'password', name: 'password', type:'password', placeholder: 'Enter your password' }}
        handleChange ={handleChange}
        param= {passwordError}
         />

        {passwordError &&
        <label className='label-error'>
            Contraseña invalida
        </label>}
        <button onClick={register}>Register</button>
   
    </div>   
)}
export default SignUp