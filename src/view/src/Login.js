import { useState } from 'react';
import React from 'react';
import Header from './Header.js';
import { Redirect, Link } from 'react-router-dom'
import './Login.css'

function Login () {
  let [userName, setUserName] = useState('')
  let [password, setPassword] = useState('')
  let [redirect, setRedirect] = useState(false)

  async function handleSubmit (e) {
    e.preventDefault()
    let payload = { userName: userName, password: password }
    let headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    let reqBody = { headers: headers, method: 'POST', body: JSON.stringify(payload), redirect: 'follow' }
    try {
      let res = await fetch('/login', reqBody)
      if (res.redirected) setRedirect(true)
      console.log(redirect)
      console.log('fetch request made? aye lmao')
    }
    catch (error) {
      console.log('Error Loggin in: /login route: ', error)
    }
  }

  if (redirect) return <Redirect to={"/" + userName} />

  return (
    <>
      <Header />
      <form className="log-in" onSubmit={handleSubmit} method="POST" required>
      <div className="login__fields login--userName">
        <label> Username </label>
        <input type="text" name="username" onChange={e => setUserName(e.target.value)}/> <br />
      </div>
      <div className="login__fields login--password">
        <label> Password </label>
        <input type="password" name="password" onChange={e => setPassword(e.target.value)}/> <br />
      </div>
      <button className="login__button" type="submit"> Login </button>
      </form>
    </>
  )
}

export default Login
