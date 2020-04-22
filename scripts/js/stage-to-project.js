const { readJSON } = require('fs-extra')
const { resolve } = require('path')

const exec = async (stage) => {
  const data = await readJSON(resolve(__dirname, '..', '..', '.firebaserc'))
  // eslint-disable-next-line no-console
  console.log(data.projects[stage])
}

exec(process.argv[2]).catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
})
