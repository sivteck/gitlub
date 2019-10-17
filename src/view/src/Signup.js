import { useState } from 'react';
import React from 'react';
import Header from './Header.js';
import './Signup.css'
import { Redirect, Link } from 'react-router-dom'

function Signup () {
  let [userName, setUserName] = useState('')
  let [password, setPassword] = useState('')
  let [email, setEmail] = useState('')
  let [redirect, setRedirect] = useState(false)

  async function handleSubmit (e) {
    e.preventDefault()
    let payload = { userName: userName, password: password, email: email, created: Date.now() }
    let headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    let reqBody = { headers: headers, method: 'POST', body: JSON.stringify(payload) }
    try {
      let res = await fetch('http://localhost:8080/signup', reqBody)
      let resJSON = await res.json()
      if (resJSON.id) setRedirect(true)
      console.log(resJSON)
    }
    catch (error) {
      console.log('Error registering user: /signup route: ', error)
    }
  }

  if (redirect) return <Redirect to={"/" + userName} />

  return (
    <>
      <Header />
      <form className="sign-up" onSubmit={handleSubmit} method="POST" required>
      <div className="signup__fields signup--userName">
        <label> Username </label>
        <input type="text" name="username" onChange={e => setUserName(e.target.value)}/> <br />
      </div>
      <div className="signup__fields signup--password">
        <label> Password </label>
        <input type="password" name="password" onChange={e => setPassword(e.target.value)}/> <br />
        <label> Confirm Password </label>
        <input type="password" name="confirm-password" /> <br/>
      </div>
      <div className="signup--email">
        <label> Email </label>
        <input type="text" name="email" onChange={e => setEmail(e.target.value)}/> <br />
      </div>
      <button className="signup__button" type="submit"> Signup for Gitlub </button>
      </form>
    </>
  )
}

export default Signup
