import React from 'react';
import "./Home.css"
import "./Links.css"
import "./SignIn.css"
import { Link } from "react-router-dom";
import RegForm from './RegForm';


function SignUp() {
  return (
    <>
      <header className='header'>
      <h1><Link to={{pathname:`/`}} className='link'>Renit</Link></h1>
      </header>
      <main className='main main-login'> 
        <h2 className='h2 h2-login'>Sign Up</h2>
        <RegForm />  
      </main>
    </>
  );
}

export default SignUp;
