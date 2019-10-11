import { useState, useEffect } from 'react';
import React from 'react';
import Header from './Header.js';
import { Link, useParams } from 'react-router-dom'

function UserDash () {
  let { userName } = useParams()
  let [repos, setRepos] = useState([])
  const getRepos = async (user) => {
    let payload = { userName: user }
    console.log(payload)
    let headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    let reqBody = { headers: headers, method: 'POST', body: JSON.stringify(payload), redirect: 'follow' }
    try {
      let res = await fetch('http://localhost:8080/' + user, reqBody)
      let reposM = await res.json()
      setRepos(reposM)
      console.log("les repos")
    }
    catch (error) {
      console.log('Error accessing user info: ', user, error)
    }
  }


  useEffect(() => {
  getRepos(userName)
  }, [])

  return (
    <>
      <Header />
      <p> Welcome {userName}! </p>
      {repos.map(repo => <Link to={`/${userName}/${repo}`}> {repo} </Link> )}
      <Link to="/createRepo"> Create Repo </Link>
    </>
  )
}

export default UserDash
