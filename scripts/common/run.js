const run = (exec) => {
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
