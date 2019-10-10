const fs = require('fs').promises

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

module.exports = { getRepos }
