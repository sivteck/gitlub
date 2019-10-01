const { spawn } = require('child_process')

async function getOutput (readable) {
  readable.setEncoding('utf-8')
  let data = ''
  for await (const chunk of readable) {
    data += chunk
  }
  return data
}

function addPrefix (data) {
  let len = data.length + 4
  len = len.toString(16)
  let prefix = '0'.repeat(4 - len.length) + len
  return prefix + data
}

async function getInfoRefs (req, res, err) {
  console.log(req.headers)
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

function gitUploadPack (req, res, err) {
  let userName = req.params.userName
  let repoName = req.params.repoName
  let git = spawn('git-upload-pack', ['--stateless-rpc', `repos/${userName}/${repoName}`])
  git.stdin.write(req.body.toString())
  git.stdout.pipe(res)
  git.stdout.on('data', (data) => console.log(data))
  git.stderr.on('data', (data) => console.log(`git stderr: ${data.toString()}`))
}

module.exports = { getInfoRefs, gitUploadPack }
