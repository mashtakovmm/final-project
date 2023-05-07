import React from 'react';
import "./Home.css"
import "./Links.css"
import { Link } from "react-router-dom";
import { useState ,useEffect } from 'react';
import Footer from './Footer';

function Home() {
  const [token, setToken] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token")
    const localStorageEmail = localStorage.getItem("email")
    if(localStorageToken !== "" && localStorageEmail !== "") {
      setToken(localStorageToken)
      setEmail(localStorageEmail)
    }
  })

  function logOutButtonClick() {
    localStorage.setItem("token", "")
    localStorage.setItem("email", "")
    window.location.reload()
  }

  return (
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
      <main className='main'> 
        <h2 className='h2'>О нас</h2>
        <div className='p-container'>
          <p className='p'>Добро пожаловать на наш сервис по аренде велосипедов! Мы предлагаем удобный способ получить доступ к качественным велосипедам для прогулок, спортивных мероприятий и повседневных поездок.</p>
          <p className='p'>С нашим сервисом вы можете арендовать велосипеды по часам, дням или неделям. У нас есть широкий выбор велосипедов, включая горные велосипеды, шоссейные велосипеды, гибриды и детские велосипеды. Все наши велосипеды находятся в идеальном состоянии, обслуживаются и проверяются перед каждой арендой, чтобы вы могли наслаждаться безопасной и комфортной поездкой.</p>
          <p className='p'>Мы гарантируем простой и быстрый процесс аренды, который включает в себя онлайн-бронирование, оформление договора аренды и получение велосипеда в нашем удобном месте расположения. Мы также предлагаем дополнительные услуги, такие как доставка велосипеда в месте вашего проживания, аренда дополнительного оборудования, такого как каски и замки, а также индивидуальные консультации и маршруты для тех, кто нуждается в дополнительной помощи.</p>
          <p className='p'>Наша миссия - сделать аренду велосипедов максимально доступной и удобной для каждого. Мы стремимся предоставить нашим клиентам высокий уровень сервиса и качественные велосипеды, чтобы вы могли наслаждаться красотой окружающей природы и удобством перемещения в городе на своем любимом двухколесном транспорте.</p>
        </div>
        <div>
          <h2 className='h2'>Полезные ссылки</h2>
          <div className='useful-links-container'>
            <button className='button'><Link to={{ pathname: `/submit`}} className='link'>СООБЩИТЬ О КРАЖЕ</Link></button>
            <button className='button'><Link to={{ pathname: `/reports`}} className='link'>СООБЩЕНИЯ О КРАЖАХ</Link></button>
            <button className='button'><Link to={{ pathname: `/officers`}} className='link'>ОТВЕТСТВЕННЫЕ СОТРУДНИКИ</Link></button>
          </div>
        </div>
        <img src="icon.png" alt="Изображение сервиса" className='img-home'/>
      </main>
      <Footer />
    </>
  );
}

export default Home;
