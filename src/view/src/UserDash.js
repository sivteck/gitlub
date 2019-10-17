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
      let resJson = await res.json()
      setRepos(resJson.repos)
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
      <Header loggedIn={true} userName={userName}/>
      <p> Welcome {userName}! </p>
      <Link to="/createRepo"> Create Repo </Link> <br />
      {repos.map(repo => <> <Link to={`/${userName}/${repo}`}> {repo} </Link> <br /> </>)}
    </>
  )
}

export default UserDash
