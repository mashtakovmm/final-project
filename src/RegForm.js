import React, { useState } from 'react';
import "./Home.css"
import "./SignIn.css"
import "./Error.css"
import "./Links.css"
import { Link } from 'react-router-dom';


function RegForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [clientId, setClientId] = useState(localStorage.getItem("clientId"))
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [color, setColor] = useState("red")

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true)
    SignUp(email, password, clientId, name, lastname)
  };

  function SignUp(email, password, clientId, name, lastname) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      "email": email,
      "password": password,
      "clientId": clientId,
      "firstName": name,
      "lastName": lastname
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    fetch("https://sf-final-project-be.herokuapp.com/api/auth/sign_up", requestOptions)
    .then(response => {
      if (!response.ok) {
        response.json().then(data => setError(data.message))
        setColor("red")
      } else {
        setError("Регистрация прошла успешно")
        setColor("green")
      }
    })
    .catch(error => setError(error.message));  
  }   

  return (
    <>
        {isSubmitted ? (
        <>
        <div  style={{ color: color }}>
          {error}
        </div>
    </>
        ):(<></>)}
        <form className='log-form' onSubmit={handleSubmit} autoComplete="off">
        <div>
            <label htmlFor="email">Email</label>
            <input
            type="email"
            id="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="name">Name</label>
            <input
            type="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="surname">Lastname</label>
            <input
            type="surname"
            id="surname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="clientId">Client Id</label>
            <input
            type="clientId"
            id="clientId"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            />
        </div>
        <button type="submit">Зарегистрироваться</button>
        </form>
    </>
  );
}


export default RegForm;
