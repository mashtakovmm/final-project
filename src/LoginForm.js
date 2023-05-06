import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"
import "./Links.css"
import "./SignIn.css"


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true)
    SignIn(email, password)
  };

  function SignIn(email, password) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "email": email,
    "password": password
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://sf-final-project-be.herokuapp.com/api/auth/sign_in", requestOptions)
    .then(response => {
        if (!response.ok) {
            response.json().then(data => setError(data.message))
          } else {
            response.json().then(result => {
                const token = result.data.token;
                const email = result.data.user.email;
                localStorage.setItem('token', token); 
                localStorage.setItem('email', email); 
                window.location.replace("/"); 
            })
          }
        })
    .catch(error => console.log('error', error));
}

  return (
    <>
        {isSubmitted ? (<div className='error'>{error}</div>):(<></>)}
        <form className='log-form' onSubmit={handleSubmit}>
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
        <button type="submit">Войти</button>
        </form>
        <p><Link to={{pathname: "/signup"}} className='link reg-link'>Нет аккаунта?</Link></p>
    </>
  );
}



export default LoginForm;
