const fs = require('fs').promises
const { spawn } = require('child_process')

async function getOutput (readable) {
  readable.setEncoding('utf-8')
  let data = ''
  for await (const chunk of readable) {
    data += chunk
  }
  return data
}

async function getRepos (userName) {
  try {
    let repos = await fs.readdir('./repos/' + userName)
    return repos
  }
  catch (error) {
    console.log('Unable to fetch repos of user, ', userName, error)
  }
  return repos
}

async function getRepoFiles (userName, repoName) {
  try {
    let git = spawn('git', ['ls-tree', '--full-tree', 'HEAD'], { cwd: `./repos/${userName}/${repoName}` })
    let repoFiles = await getOutput(git.stdout)
    return repoFiles.split('\n')
  }
  catch (error) {
    console.log('Error getting list of files in the repo: ', userName, repoName, error)
  }
}

module.exports = { getRepos, getRepoFiles, getOutput }
