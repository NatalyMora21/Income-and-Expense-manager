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
    const [passwordError,setpasswordError]= useState(false);
    const [registerok,setRegisterok]= useState(false);


    function handleChange(name, value){
      console.log(name,value)
      if (name== 'user'){
          //Varible para almacenar
          setUser(value);
      }
      else{
          if(name== 'password'){
              if(value.length<6){
                setpasswordError(true)
              }else{
                setpasswordError(false)
                setpassword(value);
              }
          }else{  
              setName(value);
          }
      }
  }



    const register = () => {
        Axios.post("http://localhost:4001/signup", {
          name: name,
          email: user,
          password: password,
        })
          .then((result) => {
            setRegisterok(true);
            console.log("Successfully registered user");
          })
          .catch((err) => {
            alert("error");
          });
      };

    return (


      <div>
      <div className="container">
          <div className="login-container">
              <Title text="Create your account"/>

          <div class="card">
              <div class="card-body">

                  <div class="mb-3">
                          <Label text="Name"/>
                          <Input attribute={{id:'name', name: 'name', type:'text', placeholder: 'Enter your username' }} handleChange ={handleChange} />

                  </div>

                  <div class="mb-3">
                          <Label text="Email"/>
                          <Input attribute={{id:'user', name: 'user', type:'email', placeholder: 'Enter your email' }} handleChange ={handleChange} />

                          <div id="emailHelp" className="form-text">Enter the email with which you will log in</div>
                  </div>
                  <div class="mb-3">
                          <Label text="Contraseña"/>
                          <Input attribute={{id:'password', name: 'password', type:'password', placeholder: 'Enter your password' }}
                          handleChange ={handleChange}
                          param= {passwordError}/>
                  </div>
      
                      <button onClick={register} class="button-morado" >Register</button>

                      {registerok&&<div> <div class="alert alert-success" role="alert">
                      ¡Successfully registered user!</div><a href="./">Go to login</a></div> }
              </div>
          </div>


              {passwordError &&
                    <label className='label-error'>
                        The password must be longer than 6
                    </label>} 
              
                   
          </div>   
      </div>


</div>





  
)}
export default SignUp