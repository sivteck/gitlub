const express = require('express')
const Git = require('nodegit')
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const { getInfoRefs } = require('./gitServiceRPC')

const port = 8080

app = express()

app.disable('x-powered-by')

app.use(express.static('./view/build'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/createRepo', (req, res) => {
  let userName = req.body.userName
  let repoName = req.body.repoName
  Git.Repository.init(path.resolve(`./repos/${userName}/${repoName}`), 0).then(function (repo) {
  })
  res.send('Created Repo')
})

app.get('/repos/:userName/:repoName/info/refs', getInfoRefs)
// app.get('/repos/:repoName/info/refs', (req, res) => {
//   gitServiceRPC(req, res, ' ')
//   console.log(req.query)
//   let repoName = req.params.repoName
//   fs.readdir('./repos', (err, files) => {
//   files.forEach(file => {
//     console.log(file)
//   })
//   res.send('repo check')
//   })
// })

app.listen(port, () => console.log('listening on port 8080'))
