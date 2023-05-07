import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import './ReportPage.css';

function OfficerPage() {

    const [token, setToken] = useState("")
    const [email, setEmail] = useState("")
    const [approved, setApproved] = useState("false")
    const [errorColor, setErrorColor] = useState("red");
    const [error, setError] = useState(null);
    const [data, setData] = useState([])
    const { id } = useParams();
    // let newData = data;


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

    useEffect(() => {
        if(token) {
          getReportById(id)
        }
      }, [token])
      

    function getReportById(id) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://sf-final-project-be.herokuapp.com/api/officers/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {setData(result.data); console.log(result.data)})
            .catch(error => console.log('error', error));
    }
  
    function logOutButtonClick() {
      localStorage.setItem("token", "")
      localStorage.setItem("email", "")
      localStorage.setItem("approved", "false")
      window.location.reload()
    }

    const  handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => {
          return {
            ...prevData,
            [name]: value
          }
        }); 
    }

    const handleCheck = (e) => {
        const { name, checked } = e.target;
        setData((prevData) => {
          return {
            ...prevData,
            [name]: checked,
          };
        });
      };
    
    function editCase () {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
        
        const raw = JSON.stringify({
          "clientId": data.clientId,
          "email": data.email,
          "firstName": data.firstName,
          "lastName": data.lastName,
          "approved": data.approved,
        });
        
        const requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(`https://sf-final-project-be.herokuapp.com/api/officers/${id}`, requestOptions)
        .then(response => {
            if (!response.ok) {
              response.json().then(data => setError(data.message))
              setErrorColor("red")
            } else {
              setError("Изменено успешно")
              setErrorColor("green")
            }
        });

    }

    return(
    <>
        <header className='header'>
            <h1><Link to={{pathname:`/`}} className='link link-header'>Renit</Link></h1>
            <div className='button-container'>
            {email!=="" && token!=="" ? (
                <div className='loged-in-container'>
                <p className="invis">Привет, {email}</p>
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
            {!token || approved === "false" ? (
                <p style={{color:"red", textAlign:"center"}}>Данная страница доступна только зарегистрированным пользовтелям</p>
            ) : (
                <>
                <div className="report-container">
                    {error ? (<div style={{color:errorColor}}>{error}</div>):(<></>)}
                    <span className="title">ID:</span> <span> {data.clientId} </span> 
                    <span className="title">Email:</span> <span> {data.email} </span> 
                    <span className="title">Имя: </span> <input name="firstName" type="text" value={data.firstName || ''} onChange={handleChange}/>
                    <span className="title">Фамилия: </span> <input name="lastName" type="text" value={data.lastName || ''} onChange={handleChange}/>
                    <span className="title">Одобрен: </span> <input className="checkbox" name="approved" type="checkbox" checked={data.approved ? true : false} onChange={handleCheck} />
                    <button className="button" style={{'marginTop': '10px'}} onClick={editCase}>Отправить</button>
                </div>
                
                </>
            )}
        </main>
    </>
)
};

export default OfficerPage;
