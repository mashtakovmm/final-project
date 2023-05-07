import React from 'react';
import "./Home.css"
import "./SubmitReport.css"
import "./Links.css"
import "./SignIn.css"
import SubmitForm from './SubmitForm';
import { Link } from "react-router-dom";
import { useState ,useEffect } from 'react';
import Footer from './Footer';

function SubmitReport() {

    return (
        <>
        <header className='header'>
          <h1><Link to={{pathname:`/`}} className='link link-header'>Renit</Link></h1>
        </header>
        <main className='main main-login'> 
          <h2 className='h2 h2-login'>Submit Report</h2>
          <SubmitForm />
      </main>
      <Footer />
      </>
    );
  }
  
  export default SubmitReport;
  