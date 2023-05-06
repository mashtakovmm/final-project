import React from 'react';
import "./Home.css"
import "./Links.css"
import "./SignIn.css"
import { Link } from "react-router-dom";
import LoginForm from './LoginForm';


function Signin() {
  return (
    <>
      <header className='header'>
      <h1><Link to={{pathname:`/`}} className='link'>Renit</Link></h1>
      </header>
      <main className='main main-login'> 
        <h2 className='h2 h2-login'>Sign In</h2>
        <LoginForm />  
      </main>
    </>
  );
}

export default Signin;
