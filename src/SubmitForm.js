import React, { useState, useEffect } from 'react';
import "./Home.css"
import "./SignIn.css"
import "./Error.css"
import "./Links.css"

// TODO: доделать
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
  const [officersList, setOfficersList] = useState(["111", "222"]);

  useEffect(() => {
    getOfficers()
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true)
  };

//   function SignUp(email, password, clientId, name, lastname) {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
  
//     var raw = JSON.stringify({
//       "email": email,
//       "password": password,
//       "clientId": clientId,
//       "firstName": name,
//       "lastName": lastname
//     });
  
//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow'
//     };
  
//     fetch("https://sf-final-project-be.herokuapp.com/api/auth/sign_up", requestOptions)
//     .then(response => {
//       if (!response.ok) {
//         response.json().then(data => setError(data.message))
//         setErrorColor("red")
//       } else {
//         setError("Регистрация прошла успешно")
//         setErrorColor("green")
//       }
//     })
//     .catch(error => setError(error.message));  
//   }   

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
            setOfficersList(officersList.map(obj=>obj._id));
        })
        .catch(error => console.log('error', error));
    }
  }

  return (
    <> 
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
            <select className='select' id="type" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Выберите тип велосипеда</option>
                <option value="Sport">Спортивный</option>
                <option value="Road">Шоссейный велосипед</option>
                <option value="Hybrid">Гибридный велосипед</option>
                <option value="BMX">BMX велосипед</option>
                <option value="Kids">Детский велосипед</option>
                <option value="E">Электрический велосипед</option>
                <option value="Touring">Туринговый велосипед</option>
                <option value="Cyclocross">Циклокросс велосипед</option>
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
        <select className='select' id="officer" value={officer} onChange={(e) => setOfficer(e.target.value)}>
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
        </form>
    </>
  )
}


export default SubmitForm;
