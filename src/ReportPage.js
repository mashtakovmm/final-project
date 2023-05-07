import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import './ReportPage.css';
import Footer from "./Footer";

function ReportPage() {

    const [token, setToken] = useState("")
    const [email, setEmail] = useState("")
    const [approved, setApproved] = useState("false")
    const [errorColor, setErrorColor] = useState("red");
    const [error, setError] = useState(null);
    const [data, setData] = useState([])
    const { id } = useParams();
    const [officer, setOfficer] = useState("");
    const [officersList, setOfficersList] = useState([""]);
    const typeList = ['sport', 'general']
    const statusList = ['new', 'in_progress', 'done']
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
          getOfficers()
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

        fetch(`https://sf-final-project-be.herokuapp.com/api/cases/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {setData(result.data);})
            .catch(error => console.log('error', error));
    }

    function getOfficers() {
        const token = localStorage.getItem("token")
        let officersList 
        if(token) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
        
            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
        
            fetch("https://sf-final-project-be.herokuapp.com/api/officers/", requestOptions)
            .then(response => response.json())
            .then(result => {
                officersList = result.officers;
                setOfficersList(officersList.filter(obj => obj.approved).map(obj => obj._id));
            })
            .catch(error => console.log('error', error));
        }
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
    
    function editCase () {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
        
        const raw = JSON.stringify({
          "status": data.status,
          "licenseNumber": data.licenseNumber,
          "ownerFullName": data.ownerFullName,
          "type": data.type,
          "color": data.color,
          "data": data.date,
          "officer": data.officer,
          "description": data.description,
          "resolution": data.resolution
        });
        
        const requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(`https://sf-final-project-be.herokuapp.com/api/cases/${id}`, requestOptions)
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
                <p className="invis"> Привет, {email}</p>
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
                        <span className="title">ID:</span> <span>{data._id ? data._id : "-"}</span>
                        <span className="title">Сотрудник:</span> 
                        <select className='select select-page' id="officer" name="officer" value={data.officer} onChange={handleChange}>
                            {officersList.map((officerId) => (
                                <option key={officerId} value={officerId}>
                                    {officerId}
                                </option>
                        ))}
                        </select>
                        <span className="title">ФИО:</span> <input name="ownerFullName" type="text" value={data.ownerFullName || ''} onChange={handleChange}/> 
                        <span className="title">Номер лицензии: </span> <input name="licenseNumber" type="text" value={data.licenseNumber || ''} onChange={handleChange}/>
                        <span className="title">Цвет: </span> <input name="color" type="text" value={data.color || ''} onChange={handleChange}/>
                        <span className="title">Тип: </span>
                        <select className='select select-page' id="type" name="type" value={data.type} onChange={handleChange}>
                            {typeList.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                        ))}
                        </select>
                        <span className="title">Дата регистрации сообщения: </span> <span>{data.createdAt ? data.createdAt : "-"}</span>
                        <span className="title">Последнее обновление: </span> <span>{data.updatedAt ? data.updatedAt : "-"}</span>
                        <span className="title">Описание: </span> <textarea className="descr-input" name="description" rows="4" value={data.description || ''} onChange={handleChange}></textarea>
                        <span className="title">Статус: </span>
                        <select className='select select-page' id="status" name="status" value={data.status} onChange={handleChange}>
                            {statusList.map((status) => (
                                <option key={status} value={status} disabled={status === 'done' && !data.resolution}>
                                    {status}
                                </option>
                        ))}
                        </select>
                        <span className="title">Решение: </span> <input name="resolution" type="text" value={data.resolution || ''}  onChange={handleChange}/>
                        <button className="button" style={{'marginTop': '10px'}} onClick={editCase}>Отправить</button>
                    </div>
                </>
            )}
        </main>
        <Footer />
    </>
)
};

export default ReportPage;
