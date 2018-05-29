const dotenv = require('dotenv')

const run = (exec) => {
  dotenv.config()
  exec()
    .then(() => {
      process.exit()
    })
    .catch((error) => {
      console.log(error)
      process.exit(1)
    })
}

module.exports = run
