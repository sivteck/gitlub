const express = require('express')
const Git = require('nodegit')
const fs = require('fs')

app = express()
const port = 80

app.get('/', (req, res) => {
  Git.Clone("https://github.com/sivteck/webserver", "./repos/webse")
  .then(function(repo) { return 0})
  fs.readdir('./repos', (err, files) => {
    files.forEach(file => {
      console.log(file)
    })
  res.send('meme kiill')
  })
})

app.listen(port, () => console.log('listening on port 80'))
