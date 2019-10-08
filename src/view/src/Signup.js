import { useState } from 'react';
import React from 'react';
import Header from './Header.js';
import { Link } from 'react-router-dom'
import './Signup.css'

function Signup () {
  let [userName, setUserName] = useState('')
  let [password, setPassword] = useState('')
  let [email, setEmail] = useState('')

  const handleSubmit = (e) => console.log(e.target)
  return (
    <>
      <Header />
      <form className="sign-up" onSubmit={handleSubmit} method="POST" required>
      <div className="signup__fields signup--userName">
        <label> Username </label>
        <input type="text" name="username" /> <br />
      </div>
      <div className="signup__fields signup--password">
        <label> Password </label>
        <input type="password" name="password" /> <br />
        <label> Confirm Password </label>
        <input type="password" name="confirm-password" /> <br/>
      </div>
      <div className="signup--email">
        <label> Email </label>
        <input type="text" name="email" /> <br />
      </div>
      <button className="signup__button" type="submit"> Signup for Gitlub </button>
      </form>
    </>
  )
}

export default Signup
