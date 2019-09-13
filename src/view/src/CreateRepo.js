import React from 'react';

function CreateRepo () {

  const handleSubmit = async (e) => {
    e.preventDefault()
    let userName = document.getElementById('user-name').value
    let repoName = document.getElementById('repo-name').value
    let payload = { userName: userName, repoName: repoName, created: Date.now() }
    let headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    let reqBody = { headers: headers, method: 'POST', body: JSON.stringify(payload) }
    let res = await fetch('http://localhost:8080/createRepo', reqBody)
    let resJSON = await res.json()
  }


  return (
    <form id="create-repo" onSubmit={handleSubmit} method="POST">
      <label> User Name </label>
      <input type="text" id="user-name" /> <br />
      <label> Repo Name </label>
      <input type="text" id="repo-name" /> <br />
      <button type="submit"> Create Repository </button>
    </form>
  )
}

export default CreateRepo
