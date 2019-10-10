const Pool = require('pg').Pool
const config = require('../config.js')
const uuid = require('uuid/v4')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const pool = new Pool(config)

let createTableQ = `CREATE TABLE IF NOT EXISTS users (
                    id UUID PRIMARY KEY,
                    username VARCHAR UNIQUE,
                    salt VARCHAR,
                    passwordhash VARCHAR,
                    email VARCHAR
                    )`

async function initDb () {
  try {
    let result = await pool.query(createTableQ)
  }
  catch (error) {
    console.log('unable to create table, ', error)
  }
}

async function createUser (userName, password, email) {
  await initDb()
  let id = uuid()
  let saltRounds = 10
  try {
    let salt = await bcrypt.genSalt(saltRounds)
    let passwordHash = await bcrypt.hash(password, salt)
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, userName, salt, passwordHash, email]
    }
    let result = await pool.query(query)
    return result.rows[0].id
  }
  catch (error) {
    console.log('Unable to create user, ', error)
  }
}

async function verifyPassword (userName, password) {
  const query = {
    text: 'SELECT passwordHash FROM users WHERE userName = $1',
    values: [userName]
  }
  try {
    let result = await pool.query(query)
    let hash = result.rows[0].passwordhash
    let passwordMatch = await bcrypt.compare(password, hash)
    return passwordMatch
  }
  catch (error) {
    console.log('Wrong password, ', error)
  }
}

async function userExists (userName) {
  const query = {
    text: 'SELECT id FROM users WHERE username = $1',
    values: [userName]
  }
  try {
    let result = await pool.query(query)
    return result.rows[0]
  }
  catch (error) {
    console.log('Error trying to lookup user, ', userName, error)
  }
}

module.exports = { createUser, verifyPassword, userExists }
