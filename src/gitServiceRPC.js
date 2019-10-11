const { spawn } = require('child_process')
const { getOutput } = require('./utils.js')

function addPrefix (data) {
  let len = data.length + 4
  len = len.toString(16)
  let prefix = '0'.repeat(4 - len.length) + len
  return prefix + data
}

async function getInfoRefs (req, res) {
  let userName = req.params.userName
  let repoName = req.params.repoName
  let service = req.query.service
  res.setHeader('Expires', 'Fri, 01 Jan 1980 00:00:00 GMT')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate')
  res.setHeader('Content-Type', `application/x-${service}-advertisement`)
  let git = spawn('git-upload-pack', ['--stateless-rpc', '--advertise-refs', `repos/${userName}/${repoName}`])
  let prefix = addPrefix(`# service=${service}\n`)
  let data = await getOutput(git.stdout)
  data = prefix + '0000' + data
  res.send(data)
}

function gitUploadPack (req, res) {
  let userName = req.params.userName
  let repoName = req.params.repoName
  let git = spawn('git-upload-pack', ['--stateless-rpc', `repos/${userName}/${repoName}`])
  git.stdin.write(req.body.toString())
  git.stdout.pipe(res)
  git.stderr.on('data', (data) => console.log(`git stderr: ${data.toString()}`))
}

function gitReceivePack (req, res) {
  let userName = req.params.userName
  let repoName = req.params.repoName
  let git = spawn('git', ['receive-pack', `./repos/${userName}/${repoName}`])
  git.stdin.write(req.body)
  git.stdout.pipe(res)
}

module.exports = { getInfoRefs, gitUploadPack, gitReceivePack }
