import React, {useState} from 'react';
import './login.css'
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'

import Title from '../components/Title/title.jsx'
import Label from '../components/Label/label.jsx'
import Input from '../components/Input/input.jsx'
/*import UserAuth from '../components/index'*/

const Login= ()=>{
    const [user, setUser]= useState('');
    const [password, setpassword]= useState('');
    const [passwordError,setpasswordError]= useState(false);
    const [islogin, setIslogin]= useState(false);
    //Alert error
    const [hasError, setHasError]= useState(false);

    function handleChange(name, value){
        if (name== 'user'){
            //Varible para almacenar
            setUser(value);

        }
        else{
            if(value.length<6){
                setpasswordError(true)

            }else{
                setpasswordError(false)
                setpassword(value);
            }
            
        }
    }

    function ifmatch(param){
        if(param.user>0 && param-password>0){
            //Validar que el usaurio esté en la base de datos y que el usaurio y contraseña sean correctos
            if(param.user){
                setIslogin(true)
                //llevar a otra pantalla 
            }
            else{
                setIslogin(false)
                setHasError(true)
            }
 
        }
    }

    /*function handleSubmitprueba(){
        let account= {user, password}
        if (account){
            console.log('account', account)
            ifmatch(account);
        }

    }*/
    console.log('usuario:', user)
    console.log('pass:', password)

    const handleSubmit = () => {
        Axios.post("http://localhost:4001/login", {
          email: user,
          password: password,
        })
          .then((result) => {
            
            if (!result.data.auth){
                console.log('Message',result.data.message)
                setIslogin(false)
                setHasError(true)
                
                
            }
            else{
              localStorage.setItem("token", result.data.token)
              setIslogin(true)
              setHasError(false)
              window.location.href="./home"
              console.log('Message',result.data.message)
            }
          })
          .catch((err) => {
            alert("error");
          });
      };


    return (
        <div className="login-container">
            <Title text="Bienvenido"/>
            {hasError &&
                <label className='label-error'>Su usuario y contraseña son incorrectos, o no existen en nuestra plataforma</label>
            }
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

            <button onClick={handleSubmit}>Login</button>
       
        </div>   
    )
}
export default Login