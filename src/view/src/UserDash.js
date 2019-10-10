import { useState, useEffect } from 'react';
import React from 'react';
import Header from './Header.js';
import { Link, useParams } from 'react-router-dom'

function UserDash () {
  let { user } = useParams()
  let [repos, setRepos] = useState([])

  const getRepos = async (user) => {
    let payload = { userName: user }
    let headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    let reqBody = { headers: headers, method: 'POST', body: JSON.stringify(payload), redirect: 'follow' }
    try {
      let res = await fetch('/' + user, reqBody)
      let repos = await res.json()
      setRepos(repos)
    }
    catch (error) {
      console.log('Error accessing user info: ', user, error)
    }
  }

  useEffect(() => 
    getRepos(user)
  , [])
  
  return (
    <>
      <Header />
      <p> Welcome {user}! </p>
      {repos.map(repo => <p> {repo} </p>)}
      <Link to="/createRepo"> Create Repo </Link>
    </>
  )
}

export default UserDash
