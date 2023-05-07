import React, { useState, useEffect } from 'react';
import "./Home.css"
import "./SignIn.css"
import "./Error.css"
import "./Links.css"
import "./SubmitReport.css"

function SubmitForm() {
  const [clientId, setClientId] = useState(localStorage.getItem("clientId"))
  const [errorColor, setErrorColor] = useState("red");
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ownerFullName, setOwnerFullName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [officer, setOfficer] = useState("");
  const [officersList, setOfficersList] = useState([""]);

  useEffect(() => {
    getOfficers()
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true)
    if(localStorage.getItem("token")){
        createCasePrivate(ownerFullName, licenseNumber, type, color, date, description, officer)
    } else {
        createCasePublic(ownerFullName, licenseNumber, type, clientId, color, date, description)
    }
  };

  function createCasePublic (name, licenseNumber, type, clientId, color="", date="", description="") {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "ownerFullName": name,
    "licenseNumber": licenseNumber,
    "type": type,
    "clientId": clientId,
    "color": color,
    "date":date,
    "description":description
    });

    const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://sf-final-project-be.herokuapp.com/api/public/report", requestOptions)
    .then(response => {
        if (!response.ok) {
          response.json().then(data => setError(data.message))
          setErrorColor("red")
        } else {
          setError("Сообщение отправлено успешно")
          setErrorColor("green")
          clearForm()
        }
      });
}

  function createCasePrivate(name, licenseNumber, type, color="", date="", description="", officerId) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

    const raw = JSON.stringify({
        "ownerFullName": name,
        "licenseNumber": licenseNumber,
        "type": type,
        "color": color,
        "date":date,
        "description":description,
        "officer":officerId
    });

    const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://sf-final-project-be.herokuapp.com/api/cases/", requestOptions)
    .then(response => {
        if (!response.ok) {
          response.json().then(data => setError(data.message))
          setErrorColor("red")
        } else {
          setError("Сообщение отправлено успешно")
          setErrorColor("green")
          clearForm()
        }
      });
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

    function clearForm() {
        setColor = ""
        setDate = ""
        setDescription = ""
        setOwnerFullName = ""
        setLicenseNumber = ""
        setType = ""
      }

  return (
    <> 
        {isSubmitted ? (<div style={{color:errorColor}}>{error}</div>):(<></>)}
        <form className='log-form' onSubmit={handleSubmit} autoComplete="off">
        <div>
            <label htmlFor="ownerFullName">Полное имя *</label>
            <input
            type="ownerFullName"
            id="ownerFullName"
            value={ownerFullName} 
            onChange={(e) => setOwnerFullName(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="licenseNumber">Номер лицензии *</label>
            <input
            type="licenseNumber"
            id="licenseNumber"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="type">Тип велосипеда *</label>
            <select className='select select-submit' id="type" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Выберите тип велосипеда</option>
                <option value="sport">Спортивный</option>
                <option value="general">Обычный</option>
            </select>
        </div>
        <div>
            <label htmlFor="colorString">Цвет</label>
            <input
            type="colorString"
            id="colorString"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="date">Дата</label>
            <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="description">Описание</label>
            <input
            type="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        </div>
        {localStorage.getItem("token") ? 
        (
        <div>
        <label htmlFor="type">ID сотрудника</label>
        <select className='select select-submit' id="officer" value={officer} onChange={(e) => setOfficer(e.target.value)}>
            <option value="">Выберите сотрудника</option>
            {officersList.map((officerId) => (
                <option key={officerId} value={officerId}>
                    {officerId}
                </option>
        ))}
        </select>
        </div>
        ):(
        <div>
            <label htmlFor="clientId">ID клиента</label>
            <input
            type="clientId"
            id="clientId"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            />
        </div>   
        )}
        <button type="submit">Отправить</button>
        </form>
    </>
  )
}


export default SubmitForm;
