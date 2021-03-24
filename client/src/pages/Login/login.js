import React, {useState} from 'react';
//import './login.css'
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style.css'
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

        <div>

            <header>

            </header>

            <div className="container">
            <div className="login-container">
                <Title text="Welcome to the registration system of your transactions"/>
                {hasError &&
                    <label className='label-error'>Su usuario y contraseña son incorrectos, o no existen en nuestra plataforma</label>
                }

            <div class="card">
                <div class="card-body">
                    <div class="mb-3">
                            <Label text="User"/>
                            <Input attribute={{id:'user', name: 'user', type:'email', placeholder: 'Enter your username' }} handleChange ={handleChange} />

                            <div id="emailHelp" className="form-text">Enter email with which you registered</div>
                    </div>
                    <div class="mb-3">
                            <Label text="Contraseña"/>
                            <Input attribute={{id:'password', name: 'password', type:'password', placeholder: 'Enter your password' }}
                            handleChange ={handleChange}
                            param= {passwordError}/>
                    </div>
        
                        <button onClick={handleSubmit} class="button-morado">Login</button>
                        
                        <div className="newacount"> 
                        New? <a href="">Create an account.</a>
                        </div>
        
                        
                </div>
            </div>
                {passwordError &&
                <label className='label-error'>
                    Contraseña invalida
                </label>}       
            </div>   
            </div>

        </div>
    )
}
export default Login