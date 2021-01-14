import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import User from './components/User';


function App() {
  const login = localStorage.getItem('auth-login')
  return (
    <div className="App">
       <BrowserRouter>
          <div align="center">      
            <Link to="/SignUp">SignUp</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/SignIn">SignIn</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    
            <Route path="/SignUp" component={SignUp}/> 
            <Route path="/SignIn" component={SignIn}/>
            <Route path="/User" component={User}/>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;