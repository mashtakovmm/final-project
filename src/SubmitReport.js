import React from 'react';
import "./Home.css"
import "./SubmitReport.css"
import "./Links.css"
import { Link } from "react-router-dom";
import { useState ,useEffect } from 'react';

function SubmitReport() {

    return (
        <>
        <header className='header'>
        <h1><Link to={{pathname:`/`}} className='link'>Renit</Link></h1>
        </header>
        <main className='main'> 
            
        </main>
      </>
    );
  }
  
  export default SubmitReport;
  