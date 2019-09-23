const { spawn } = require('child_process')

function gitServiceRPC (req, res, err) {
  let userName = req.params.userName
  let repoName = req.params.repoName
  let service = req.query.service
  console.log(req.body)
  console.log(service)
  res.setHeader('Expires', 'Fri, 01 Jan 1980 00:00:00 GMT')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate')
  res.setHeader('Content-Type', `application/x-${service}-advertisement`)
  //spawn('ls').stdout.on('data', (data) => {
  //  console.log(data.toString())
  //})
  let git = spawn('git-upload-pack', ['--stateless-rpc', `repos/${userName}/${repoName}`], { env : { 'GIT_TRACE_PACKET': '1', 'GIT_TRACE': '1', 'GIT_CURL_VERBOSE': '1' } })
  req.pipe(git.stdin)
  git.stdout.pipe(res)
  git.stderr.on('data', (data) => console.log('git stderr: ' + data.toString()))
  git.on('exit', () => res.end())
}

module.exports = gitServiceRPC
