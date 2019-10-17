import { useState, useEffect } from 'react';
import React from 'react';
import Header from './Header.js';
import './CreateRepo.css'

function CreateRepo (props) {
  let [userName, setUserName] = useState('')
  let [repoName, setRepoName] = useState('')

  const checkValidSession = async () => {
    let payload = {}
    let headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    let reqBody = { headers: headers, method: 'POST', body: JSON.stringify(payload) }
    try {
      let res = await fetch('http://localhost:8080/checkValidSession', reqBody)
      let sessionInfo = await res.json()
      console.log(sessionInfo)
      if (sessionInfo.userName) setUserName(sessionInfo.userName)
    }
    catch (error) {
      console.log('Error validating session: ', error)
    }
  }

  useEffect( () => {
    checkValidSession()
  }, [])


  async function handleSubmit (e) {
    e.preventDefault()
    let payload = { userName: userName, repoName: repoName, created: Date.now() }
    let headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    let reqBody = { headers: headers, method: 'POST', body: JSON.stringify(payload) }
    try {
      let res = await fetch('/createRepo', reqBody)
      let resJSON = await res.json()
      console.log(resJSON)
    }
    catch (error) {
      console.log('Error initializing empty repo: /createRepo route: ', error)
    }
  }

  let slashStyle = {
    "font-size": "1.2em",
    "margin-top": "10px",
    "margin-bottom": "10px"
  }

  return (
    <>
    <Header loggedIn={props.loggedIn} userName={props.userName}/>
    <form className="create-repository" onSubmit={handleSubmit} method="POST" required>
    <div className="create-repository__fields">
    <div className="create-repository--userName">
      <label> Owner </label>
      <input type="text" name="userName" value={userName} onChange = {e => setUserName(e.target.value)} /> <br />
    </div>
    <div>
    <br />
    <p style={slashStyle}>/</p>
    </div>
    <div className="create-repository--repoName">
      <label> Repository Name </label>
      <input type="text" name="repoName" value={repoName} onChange = {e => setRepoName(e.target.value)} /> <br />
    </div>
    </div>
      <button className="create-repository__button" type="submit"> Create Repository </button>
    </form>
    </>
  )
}

export default CreateRepo
