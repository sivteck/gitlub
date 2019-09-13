const express = require('express')
const Git = require('nodegit')
const fs = require('fs')

const port = 8080

app = express()

app.use(express.static('./view/build'))
app.use(express.json())

app.post('/createRepo', (req, res) => {
  console.log(req.body.userName)
  console.log(req.body.repoName)
  // Git.Repository.init(pathToRepo, isBare).then(function (repo) {
  // });
  res.send('Created Repo')
})

app.listen(port, () => console.log('listening on port 8080'))
