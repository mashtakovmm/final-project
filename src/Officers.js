import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OfficersTable from "./OfficersTable";

function Officers() {

    const [token, setToken] = useState("")
    const [email, setEmail] = useState("")
    const [approved, setApproved] = useState("false")
  
    useEffect(() => {
        const localStorageToken = localStorage.getItem("token")
        const localStorageEmail = localStorage.getItem("email")
        const localStorageApproved = localStorage.getItem("approved")
        if(localStorageToken !== "" && localStorageEmail !== "") {
          setToken(localStorageToken)
          setEmail(localStorageEmail)
          setApproved(localStorageApproved)
        }
      })
  
    function logOutButtonClick() {
      localStorage.setItem("token", "")
      localStorage.setItem("email", "")
      localStorage.setItem("approved", "false")
      window.location.reload()
    }

    return(
    <>
        <header className='header'>
            <h1><Link to={{pathname:`/`}} className='link link-header'>Renit</Link></h1>
            <div className='button-container'>
            {email!=="" && token!=="" ? (
                <div className='loged-in-container'>
                <p>Привет, {email}</p>
                <button className='button log-out-button' onClick={logOutButtonClick}>Log Out</button>
                </div>
            ) : (
                <>
                <button className='button'><Link to={{ pathname: `/signin`}} className='link'>Вход</Link></button>
                <button className='button'><Link to={{ pathname: `/signup`}} className='link'>Регистрация</Link></button>
                </>
            )}
            </div>
        </header>
        <main>
            {!token || approved == "false" ? (
                <p style={{color:"red", textAlign:"center"}}>Данная страница доступна только зарегистрированным пользовтелям</p>
            ) : (
                <>
                    <OfficersTable />
                </>
            )}
        </main>
    </>
)
};

export default Officers;
