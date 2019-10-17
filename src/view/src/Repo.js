import { useState, useEffect } from 'react';
import React from 'react';
import Header from './Header.js';
import { Link, useParams } from 'react-router-dom'

function Repo ({ loggedIn }) {
  let { userName, repoName } = useParams()
  let [repoFiles, setRepoFiles] = useState([])

  const getRepoFiles = async (user, repo) => {
    let payload = { userName: user, repoName: repo }
    let headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    let reqBody = { headers: headers, method: 'POST', body: JSON.stringify(payload) }
    try {
      let res = await fetch('http://localhost:8080/' + user + '/' + repo, reqBody)
      let repoFilesRes = await res.json()
      console.log(res)
      setRepoFiles(repoFilesRes)
    }
    catch (error) {
      console.log('Error accessing repo info: ', user, error)
    }
  }

  useEffect(async () => 
    await getRepoFiles(userName, repoName)
  , [])

  return (
    <>
      <Header loggedIn={true} userName={userName}/>
      {repoFiles.map(repoFile => <p> {repoFile} </p>)}
    </>
  )
}

export default Repo
