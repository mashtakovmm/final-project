import React, { useState } from 'react';
import "./Home.css"
import "./SignIn.css"
import "./Error.css"


function RegForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clientId, setClientId] = useState(localStorage.getItem("clientId"))
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true)
    SignUp(email, password, clientId)
  };

  function SignUp(email, password, clientId) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      "email": email,
      "password": password,
      "clientId": clientId
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
      } else {
        response.json().then(result => console.log(result))
      }
    })
    .catch(error => setError(error.message));  
  }   

  return (
    <>
        {isSubmitted ? (<div className='error'>{error}</div>):(<></>)}
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
        <button type="submit">Зарегистрироваться</button>
        </form>
    </>
  );
}


export default RegForm;
