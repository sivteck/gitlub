const express = require('express')
const Git = require('nodegit')
const fs = require('fs')
const path = require('path')
const { createUser, verifyPassword } = require('./model/schema.js')
const { spawn } = require('child_process')
const { getInfoRefs, gitUploadPack, gitReceivePack } = require('./gitServiceRPC')

const port = 8080

app = express()

app.use(express.static('./view/build'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.raw({
  type: 'application/x-git-upload-pack-request'
}))
app.use(express.raw({
  inflate: true,
  type: 'application/x-git-receive-pack-request'
}))

app.post('/createRepo', (req, res) => {
  let userName = req.body.userName
  let repoName = req.body.repoName
  let isBare = 1
  Git.Repository.init(path.resolve(`./repos/${userName}/${repoName}`), isBare).then(function (repo) {
  })
  res.json({ msg: 'Created Repo' })
})

app.get('/repos/:userName/:repoName/info/refs', getInfoRefs)

app.post('/repos/:userName/:repoName/git-upload-pack', gitUploadPack)

app.post('/repos/:userName/:repoName/git-receive-pack', gitReceivePack)

app.post('/signup', async (req, res, err) => {
  try {
    let id = await createUser(req.body.userName, req.body.password, req.body.email)
    res.json({ id: id })
  }
  catch (error) {
    console.log('Signup Error, ', error)
  }
})

app.post('/login', async (req, res, err) => {
  console.log(verifyPassword)
  try {
    let passwordMatch = await verifyPassword(req.body.userName, req.body.password)
    console.log('passwordMatch: ', passwordMatch)
  }
  catch (error) {
    console.log('Unable to login user, ', error)
  }
})


app.listen(port, () => console.log('listening on port 8080'))
