import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../pages/Login/login'
import Home from '../pages/Home/home'
import SignUp from '../pages/SignUp/signup'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/signup' component={SignUp}/>
      </Switch>
    </BrowserRouter>


  )
}

export default Routes;