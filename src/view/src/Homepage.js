import { useState, useEffect } from 'react';
import React from 'react';
import Header from './Header.js';
import { Link } from 'react-router-dom'

function Homepage () {
  let [userName, setUserName] = useState('')
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

  if (userName !== '')
    return (
    <>
      <Header loggedIn={true} userName={userName}/>
      <p> Collaborative development platform </p>
    </>
    )
  return (
    <>
      <Header />
      <p> Collaborative development platform, Signup and Login to create repositories </p>
    </>
  )
}

export default Homepage
