const Redis = require('ioredis')
const redis = new Redis()

async function setKV (key, val) {
  let result = await redis.set(key, val)
  console.log(result)
}
