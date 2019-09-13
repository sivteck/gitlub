const express = require('express')
const Git = require('nodegit')
const fs = require('fs')
const path = require('path')

const port = 8080

app = express()

app.use(express.static('./view/build'))
app.use(express.json())

app.post('/createRepo', (req, res) => {
  let userName = req.body.userName
  let repoName = req.body.repoName
  Git.Repository.init(path.resolve('./repos/' + repoName), 0).then(function (repo) {
  })
  res.send('Created Repo')
})

app.listen(port, () => console.log('listening on port 8080'))
