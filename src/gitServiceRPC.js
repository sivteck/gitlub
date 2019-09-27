const { spawn } = require('child_process')

function getInfoRefs (req, res, err) {
  console.log(req.headers)
  console.log('---------------')
  console.log(req.git)
  let userName = req.params.userName
  let repoName = req.params.repoName
  let service = req.query.service
  res.setHeader('Expires', 'Fri, 01 Jan 1980 00:00:00 GMT')
  res.setHeader('Pragma', 'no-cache')
//   res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate')
  res.setHeader('Content-Length', '59')
  res.setHeader('Content-Type', `text/plain; charset=utf-8`)
  let git = spawn('git', ['show-ref'], { cwd: `./repos/${userName}/${repoName}` })
  git.stderr.on('data', (data) => console.log('git stderr: ' + data.toString()))
  git.stdout.pipe(res)
  git.on('exit', () => res.end())
}

module.exports = { getInfoRefs }
